from flask import jsonify, Blueprint, request
from models.product import Product
from models.list import List
from database import db

from api.image_uploader import image_uploader
from config import PRODUCT_IMG_PRESET, CLOUDINARY_NAME
import json

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
                    "old_price": prod.old_price,
                    "price": prod.price,
                    "url": prod.url,
                    "img_url": prod.img_url
                })
        return jsonify({list.product_type: product_ls}), 200
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

            product_item = Product(
                int(body['list_id']), body['name'], body['old_price'], body['price'], body['url'], new_img_url)
            db.session.add(product_item)
            
            # checks to see if data can be saved in the database
            try:
                db.session.commit()
                return jsonify({'response': "{} was successfully added to the database".format(body['name'])}), 200
            except Exception as e:
                return jsonify({'error': "{}".format(e.__cause__)}), 400
        else:
            return jsonify({'error':'product already ex' }), 400

    if request.method == "DELETE":
        body = json.loads(request.get_data())
        product_id = body['product_id']
        product_name = Product.query.filter_by(id=product_id).first().name
        Product.query.filter_by(id=product_id).delete()
        db.session.commit()
        return jsonify({'response': "{} was successfully deleted from the database".format(product_name)}), 200
