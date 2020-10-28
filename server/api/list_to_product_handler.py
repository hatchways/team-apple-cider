from flask import jsonify, Blueprint, request
from models.list_to_product import ListToProduct
from models.list import List
from database import db
import json


list_to_product_handler = Blueprint('list_to_product_handler', __name__)


@list_to_product_handler.route('/list-to-products/<list_id>', methods=['GET', 'DELETE'])
def listProductsRequest(list_id):
    if request.method == 'GET':
        products_in_list = ListToProduct.query.filter_by(list_id=list_id)
        return jsonify([product.serialize for product in products_in_list])


@list_to_product_handler.route('/list-to-products', methods=['POST'])
def allListProductsRequest():
    if request.method == 'POST':
        body = json.loads(request.get_data())
        list_id = body['list_id']
        product_id = body['product_id']

        if not ListToProduct.query.filter_by(list_id=list_id, product_id=product_id).first():
            try:
                list_product_connection = ListToProduct(list_id, product_id)
                db.session.add(list_product_connection)
                db.session.commit()
            except Exception as e:
                return jsonify({'error': "{}".format(e.__cause__)}), 400
            return jsonify({'response': "{} was successfully added to the database".format(body['name'])}), 200
        else:
            return jsonify({'error': 'product already exists in list'}), 400

    # if not Product.query
