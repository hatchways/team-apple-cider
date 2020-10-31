import json, re
from flask import jsonify, request, Blueprint
from models.price import Price
from database import db
prices_handler = Blueprint('prices_handler', __name__)
from .scraper import ScrapeAmazon



@prices_handler.route('/prices/product/<product_id>', methods=['GET', 'POST', 'DELETE'])
def onePriceRequests(product_id):
    if request.method == 'GET':
        try:
            prices = Price.query.filter_by(product_id=product_id)
            return jsonify([price.serialize for price in prices]), 200
        except Exception as e:
            return jsonify({'error': "{}".format(e.__cause__)}), 400

    if request.method == 'POST':
        try:
            body = json.loads(request.get_data())
            price_entry = Price(product_id, body['price'], body['currency'])
            db.session.add(price_entry)
            db.session.commit()
            return jsonify({'response': "Added price {} {} to product '{}'".format(body['currency'], body['price'], product_id)}), 200
        except Exception as e:
            return jsonify({'error': "{}".format(e.__cause__)}), 400

    if request.method == 'DELETE':
        try:
            prices = Price.query.filter_by(product_id=product_id)
            [db.session.delete(price) for price in prices]    
            db.session.commit()
            return jsonify({'response': "Product '{}' prices were successfully deleted from the database".format(product_id)}), 200
        except Exception as e:
            return jsonify({'error': "{}".format(e.__cause__)}), 400    
    

@prices_handler.route('/prices', methods = ['GET'])
def allPriceRequests():
    if request.method == 'GET':
        try:
            prices = Price.query.all()
            return jsonify({'prices': [price.serialize for price in prices]}), 200
        except Exception as e:
            return jsonify({'error': "{}".format(e.__cause__)}), 400    

