from flask import jsonify, Blueprint, request
from database import db
import json



list_to_product_handler = Blueprint('list_to_product_handler', __name__)


@list_to_product_handler.route('/list-to-products/<product_id>', methods=['GET', 'POST', 'DELETE'])
def listProductsReq(product_id):
    if request.method == "GET":
        list_items =  