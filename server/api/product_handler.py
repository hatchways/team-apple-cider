from flask import jsonify, Blueprint, request
from models.product import Product
from models.list import List
from models.list_to_product import ListToProduct
from database import db

from api.image_uploader import image_uploader
from config import PRODUCT_IMG_PRESET, CLOUDINARY_NAME
import json


product_handler = Blueprint('product_handler', __name__)


@product_handler.route('/products', methods=['GET', 'POST', 'PUT', 'DELETE'])
def productRequests():
    if request.method == 'GET':
        body = json.loads(request.get_data())
        product_id = body['product_id']
        product = Product.query.filter_by(id=product_id)
        return jsonify({product}), 200

    if request.method == 'POST':
        body = json.loads(request.get_data())
        product_name = body['name']

        # checks if product already exists
        if not Product.query.filter_by(name=product_name).first():
            try:
                body['price'] = round(float(body['price']), 2)
            except Exception as e:
                return jsonify({'error': "{}".format(e.__cause__)}), 400
            
            # checks to see if cloudinary works
            try:
                new_img_url = image_uploader(
                    body['img_url'], PRODUCT_IMG_PRESET, CLOUDINARY_NAME)
            except:
                return jsonify({"error : uploading image on cloudinary"}), 400

            # checks to see if data can be saved in the database
            try:
                product_item = Product(
                    int(body['list_id']), body['name'], body['old_price'], body['price'], body['url'], new_img_url)
                db.session.add(product_item)
                db.session.commit()
            except Exception as e:
                return jsonify({'error': "{}".format(e.__cause__)}), 400
            return jsonify({'response': "{} was successfully added to the database".format(body['name'])}), 200
        else:
            return jsonify({'error': 'product already exists'}), 400

    if request.method == "PUT":
        body= json.loads(request.get_data())
        my_user = session.query(User).get(5)
    if request.method == "DELETE":
        body = json.loads(request.get_data())
        product_id = body['product_id']
        product_name = Product.query.filter_by(id=product_id).first().name
        Product.query.filter_by(id=product_id).delete()
        db.session.commit()
        return jsonify({'response': "{} was successfully deleted from the database".format(product_name)}), 200
