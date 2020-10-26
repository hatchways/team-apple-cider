import json
from flask import jsonify, request, Blueprint
price_history_handler = Blueprint('price_history_handler', __name__)

@price_history_handler.route('/price_history', methods = ['GET', 'POST'])
def scraped_items():
    if request.method == 'GET':
        return jsonify({'message' : 'Price History List'})


