import json
from flask import jsonify, request, Blueprint
scraped_items_handler = Blueprint('scraped_items_handler', __name__)

@scraped_items_handler.route('/scraped_items')
def scraped_items():
    return jsonify({'message' : 'Scraped items list'})


