import json, re
from flask import jsonify, request, Blueprint
from models.price import Price
from database import db
prices_handler = Blueprint('prices_handler', __name__)
from .scraper import ScrapeAmazon



@prices_handler.route('/prices/product/<product_id>', methods=['GET', 'POST', 'DELETE'])
def onePriceRequests(product_id):
    if request.method == 'GET':
        prices = Price.query.filter_by(product_id=product_id)
        return jsonify([price.serialize for price in prices]), 200

    if request.method == 'POST':
        body = json.loads(request.get_data())
        try:
            price_entry = Price(product_id, body['price'])
            db.session.add(price_entry)
        except:
            return jsonify({'error': "{}".format(e.__cause__)}), 400      
        try:
            db.session.commit()
        except Exception as e:
            return jsonify({'error': "{}".format(e.__cause__)}), 400
        return jsonify({'response': "Added price {} to product '{}'".format(body['price'], product_id)}), 200

    if request.method == 'DELETE':
        prices = Price.query.filter_by(product_id=product_id)
        [db.session.delete(price) for price in prices]    
        try:
            db.session.commit()
        except Exception as e:
            return jsonify({'error': "{}".format(e.__cause__)}), 400    
        return jsonify({'response': "Product '{}' prices were successfully deleted from the database".format(product_id)}), 200
    

@prices_handler.route('/prices', methods = ['GET'])
def allPriceRequests():
    if request.method == 'GET':
        prices = Price.query.all()
        prices_list = []
        for item in prices:
            prices_list.append(
                {
                    "product_id": item.product_id,
                    "price": item.price,
                    "scrape_date": item.scrape_date
                })
        return jsonify({'prices': prices_list}), 200


