import json
from flask import jsonify, make_response, request, Blueprint
scrape_handler = Blueprint('scrape_handler', __name__)
from .scraper import ScrapeAmazon

@scrape_handler.route('/scrape', methods = ['POST'])
def scrape():
    if request.method == 'POST':
        URL = json.loads(request.get_data())['url']
        item = ScrapeAmazon(URL)
        if (item.name): return jsonify(item.__dict__)
        else: return jsonify({'error' : True, 'response': 'Error: Link was invalid or connection failed'})


