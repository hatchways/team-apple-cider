from flask import jsonify, Blueprint, request
from database import db
import json

list_to_product_handler = Blueprint('list_to_product_handler', __name__)
@list_to_product_handler.route('/list-to-products', methods=['GET', 'POST', 'DELETE'])
def listToProductsReqs():
    if request.method == "GET":
        pass

    
    if request.method == "POST":
        body = json.loads(request.get_data())
        list

