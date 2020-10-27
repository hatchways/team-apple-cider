from flask import jsonify, Blueprint, request
from database import db


list_to_product_handler = Blueprint('list_to_product_handler', __name__)
@product_handler.route('/products', methods=['GET', 'POST', 'PUT', 'DELETE'])