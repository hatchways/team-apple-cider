from flask import jsonify, Blueprint, request
from models.product import Product
from models.list import List
from database import db

from api.image_uploader import image_uploader
from config import PRODUCT_IMG_PRESET, CLOUDINARY_NAME
import json


product_handler = Blueprint('product_handler', __name__)


@product_handler.route('/products/<product_id>', methods=['GET', 'DELETE', 'POST', 'PUT'])
def oneProductRequests(product_id):
    if request.method == 'GET':
        try:
            product = Product.query.get(product_id)
            return jsonify(product.serialize), 200
        except Exception as e:
            return jsonify({'error': "{}".format(e.__cause__)}), 400


    if request.method == 'DELETE':
        try:
            product = Product.query.get(product_id)
            db.session.delete(product)
            db.session.commit()
            return jsonify({'response': "Product '{}' was successfully deleted from the database".format(product_id)}), 200
        except Exception as e:
            return jsonify({'error': "{}".format(e.__cause__)}), 400
    
    if request.method == 'POST':
        try:
            body = json.loads(request.get_data())
            product_item = Product(product_id, body['name'], body['currency'], body['old_price'], body['price'], body['availability'], body['url'], body['img_url'])
            db.session.add(product_item)
            db.session.commit()
            return jsonify({'response': "{} was successfully added to the database".format(body['name'])}), 200
        except Exception as e:
            return jsonify({'error': "{}".format(e.__cause__)}), 400


    if request.method == "PUT":
        req = request.get_json()
        product = Product.query.get(product_id)
        
        if product:             
            if "name" in req: product.name = req["name"]
            if "old_price" in req: product.old_price = req["old_price"]
            if "price" in req: product.price = req["price"]
            if "url" in req: product.url = req["url"]
            if "img_url" in req: product.img_url = req["img_url"]
            db.session.commit()
            return jsonify({"response" : "Product '{}' was updated".format(product_id)}), 200
        else:
            return jsonify({"error":"Product does not exist, can't update"}), 400

    

@product_handler.route('/products', methods=['GET'])
def allProductRequests():
    if request.method == 'GET':
        try:
            products = Product.query.all()
            return jsonify([product.serialize for product in products]), 200
        except Exception as e:
            return jsonify({'error': "{}".format(e.__cause__)}), 400
