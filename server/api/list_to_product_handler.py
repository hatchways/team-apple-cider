from flask import jsonify, Blueprint, request
from models.list_to_product import ListToProduct
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
        product_name = body['list_id']

    # if not Product.query

