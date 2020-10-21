from flask import jsonify, Blueprint
scrape_handler = Blueprint('scrape_handler', __name__)
from .scraper import ScrapeAmazon

@scrape_handler.route('/scrape')
def scrape():
    item = ScrapeAmazon('https://www.amazon.com/dp/B07YMJ9WFN')
    return jsonify(item.__dict__)
