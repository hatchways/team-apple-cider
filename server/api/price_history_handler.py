import json, re
from flask import jsonify, request, Blueprint
from models.prices import Prices
from database import db
price_history_handler = Blueprint('price_history_handler', __name__)
from .scraper import ScrapeAmazon


def get_url_id(URL):
    x = re.search(r"amazon.com\/.*dp\/([^/]+)", URL) 
    return x.group(1)
    

@price_history_handler.route('/price_history', methods = ['GET', 'POST'])
def price_history():
    if request.method == 'GET':
        price_history = Prices.query.all()
        price_history_ls = []
        for item in price_history:
            price_history_ls.append(
                {
                    "id": item.id,
                    "url_id": item.url_id,
                    "price": item.price,
                    "scrape_date": item.scrape_date
                })
        return jsonify({'prices': price_history_ls}), 200
    if request.method == 'POST':
        URL = json.loads(request.get_data())['url']
        try:
            item = ScrapeAmazon(URL)
            url_id = get_url_id(URL)
            price_entry = Prices(url_id, item.price)
            db.session.add(price_entry)
        except:
            return jsonify({'error': "{}".format(e.__cause__)}), 400      
        try:
            db.session.commit()
        except Exception as e:
            return jsonify({'error': "{}".format(e.__cause__)}), 400
        return jsonify({'response': "{} was successfully added to the database".format(url_id)}), 200



