import json, re
from flask import jsonify, request, Blueprint
from models.price import Price
from database import db
prices_handler = Blueprint('prices_handler', __name__)
from .scraper import ScrapeAmazon


def get_url_id(URL):
    url_match = re.search(r"amazon.com\/.*dp\/([^/]+)", URL) 
    return url_match.group(1)
    

@prices_handler.route('/prices', methods = ['GET', 'POST'])
def prices():
    if request.method == 'GET':
        prices = Price.query.all()
        prices_list = []
        for item in prices:
            prices_list.append(
                {
                    "id": item.id,
                    "url_id": item.url_id,
                    "price": item.price,
                    "scrape_date": item.scrape_date
                })
        return jsonify({'prices': prices_list}), 200
    if request.method == 'POST':
        URL = json.loads(request.get_data())['url']
        try:
            item = ScrapeAmazon(URL)
            url_id = get_url_id(URL)
            price_entry = Price(url_id, item.price)
            db.session.add(price_entry)
        except:
            return jsonify({'error': "{}".format(e.__cause__)}), 400      
        try:
            db.session.commit()
        except Exception as e:
            return jsonify({'error': "{}".format(e.__cause__)}), 400
        return jsonify({'response': "{} was successfully added to the database".format(url_id)}), 200



