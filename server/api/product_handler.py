from flask import jsonify, Blueprint, request
from models.product import Product
from database import db
from api.image_uploader import image_uploader
from config import PRODUCT_IMG_PRESET, CLOUDINARY_NAME
import json


product_handler = Blueprint('product_handler', __name__)


@product_handler.route('/products/<product_id>', methods=['GET', 'DELETE', 'PUT'])
def oneProductRequests(product_id):
   
    if request.method == 'GET':
        product = Product.query.get(int(product_id))
        return jsonify(product.serialize), 200

    if request.method == 'DELETE':
        product = Product.query.get(int(product_id))
        db.session.delete(product)
        db.session.commit()
        return jsonify({'response': "Product '{}' was successfully deleted from the database".format(product_id)}), 200
    
    if request.method == "PUT":
        req = request.get_json()
        product = Product.query.get(int(product_id))
        
        if product:             
            if "name" in req: product.name = req["name"]
            if "old_price" in req: product.old_price = req["old_price"]
            if "price" in req: product.price = req["price"]
            if "url" in req: product.url = req["url"]
            if "img_url" in req: 
                try:
                    new_img_url = image_uploader(
                    req["img_url"], PRODUCT_IMG_PRESET, CLOUDINARY_NAME)
                except:
                    return jsonify({"error : uploading image on cloudinary"}), 400
                product.img_url = new_img_url
            db.session.commit()
            return jsonify({"response" : "Product '{}' was updated".format(product_id)}), 200
        else:
            return jsonify({"error":"Product does not exist, can't update"}), 400



@product_handler.route('/products', methods=['GET', 'POST'])
def allProductRequests():
    if request.method == 'GET':
        products = Product.query.all()
        return jsonify([product.serialize for product in products]), 200

    # POST request
    if request.method == 'POST':
        body = json.loads(request.get_data())
        product_name = body['name']

#         # checks if product already exists
        if not Product.query.filter_by(name=product_name).first():
            # checks to see if cloudinary works
            try:
                new_img_url = image_uploader(
                    body['img_url'], PRODUCT_IMG_PRESET, CLOUDINARY_NAME)
            except:
                return jsonify({"error : uploading image on cloudinary"}), 400

            # checks to see if data can be saved in the database
            try:
                product_item = Product(
                    body['name'], body['old_price'], body['price'], body['url'], new_img_url)
                db.session.add(product_item)
                db.session.commit()
            except Exception as e:
                return jsonify({'error': "{}".format(e.__cause__)}), 400
            return jsonify({'response': "{} was successfully added to the database".format(body['name'])}), 200
        else:
            return jsonify({'error': 'product already exists'}), 400

  