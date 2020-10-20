import json
from flask import jsonify, Blueprint, request
from models.product import Product
from models.list import List
from database import db

product_handler = Blueprint('product_handler', __name__)


@product_handler.route('/products', methods=['GET', 'POST', 'DELETE'])
def productRequests():
    if request.method == 'GET':
        body = json.loads(request.get_data())
        list_id = body['list_id']
        products = Product.query.filter_by(list_id=list_id)
        list = List.query.filter_by(id=list_id).first()
        product_ls = []
        for prod in products:
            product_ls.append(
                {
                    "id": prod.id,
                    "name": prod.name,
                    "description": prod.description,
                    "price": prod.price,
                    "url": prod.url
                })
        return jsonify({list.product_type: product_ls}), 200
    if request.method == 'POST':
        body = json.loads(request.get_data())
        if all(body.values()) == False:
            return jsonify({'error': "input has missing fields"}), 200
        try:
            body['price'] = round(float(body['price']), 2)
        except Exception as e:
            return jsonify({'error': "{}".format(e.__cause__)}), 400
        product_item = Product(
            int(body['list_id']), body['name'], body['description'], body['price'], body['url'])
        db.session.add(product_item)
        try:
            db.session.commit()
        except Exception as e:
            return jsonify({'error': "{}".format(e.__cause__)}), 400
        return jsonify({'response': "{} was successfully added to the database".format(body['name'])}), 200

    if request.method == "DELETE":
        body = json.loads(request.get_data())
        product_id = body['product_id']
        product_name = Product.query.filter_by(id=product_id).first().name
        Product.query.filter_by(id=product_id).delete()
        db.session.commit()
        return jsonify({'response': "{} was successfully deleted from the database".format(product_name)}), 200