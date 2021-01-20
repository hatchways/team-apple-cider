from flask import jsonify, Blueprint
home_handler = Blueprint('home_handler', __name__)


@home_handler.route('/welcome')
def welcome():
    return jsonify({'welcomeMessage': 'Step 1: Run the server (completed!)'})


@home_handler.route('/')
def index():
    return "<h1>Welcome to our server !!</h1>"
