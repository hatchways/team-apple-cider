import json, re
from flask import jsonify, request, Blueprint
price_history_handler = Blueprint('price_history_handler', __name__)


def get_url_id(URL):
    x = re.search(r"amazon.com\/.*dp\/([^/]+)", URL) 
    return x.group(1)
    

@price_history_handler.route('/price_history', methods = ['GET', 'POST'])
def scraped_items():
    if request.method == 'GET':
        return jsonify({'message' : 'Price History List'})
    if request.method == 'POST':
        URL = json.loads(request.get_data())['URL']
        print(get_url_id(URL))
        return jsonify({'message' : 'Price History List'})


