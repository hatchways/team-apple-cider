from flask import jsonify, Blueprint, request
from models.list_to_product import ListToProduct, ListToProductSchema
from database import db
import json



list_to_product_handler = Blueprint('list_to_product_handler', __name__)


@list_to_product_handler.route('/list-to-products/<list_id>', methods=['GET', 'POST', 'DELETE'])
def listProductsReq(list_id):
    if request.method == "GET":
        products_in_list =  ListToProduct.query.all()
        return True