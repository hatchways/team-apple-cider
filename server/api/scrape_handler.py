import json
from flask import jsonify, make_response, request, Blueprint
scrape_handler = Blueprint('scrape_handler', __name__)
from .scraper import ScrapeAmazon

@scrape_handler.route('/scrape', methods = ['POST'])
def scrape():
    if request.method == 'POST':
        URL = json.loads(request.get_data())['URL']
        item = ScrapeAmazon(URL)
        return jsonify(item.__dict__)
