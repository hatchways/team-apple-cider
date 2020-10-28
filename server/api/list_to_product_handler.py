from flask import jsonify, Blueprint, request
from models.list_to_product import ListToProductSchema, ListToProduct
from database import db, ma
import json



list_to_product_handler = Blueprint('list_to_product_handler', __name__)


@list_to_product_handler.route('/list-to-products/<list_id>', methods=['GET', 'POST', 'DELETE'])
def listProductsReq(list_id):
    if request.method == "GET":
        products_in_list =  ListToProduct.query.filter_by(list_id=list_id)
        # list_to_product_schema = ListToProductSchema(many=True)
        # output = list_to_product_schema.dump(products_in_list)
        return jsonify([product.serialize for product in products_in_list])