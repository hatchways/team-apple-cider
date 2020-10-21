from flask import jsonify, Blueprint
scrape_handler = Blueprint('scrape_handler', __name__)

@scrape_handler.route('/scrape')
def welcome():
    return jsonify({'welcomeMessage': 'Route for scraping an Amazon URL'})
