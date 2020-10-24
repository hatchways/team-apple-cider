import json
from flask import jsonify, request, Blueprint
scraped_items_handler = Blueprint('scraped_items_handler', __name__)

@scraped_items_handler.route('/scraped_items', methods = ['GET', 'POST'])
def scraped_items():
    if request.method == 'GET':
        return jsonify({'message' : 'Scraped items list'})


