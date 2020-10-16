from flask import Flask, redirect, url_for, render_template, request, flash
from api.ping_handler import ping_handler
from api.home_handler import home_handler
from flask_sqlalchemy import SQLAlchemy
from flask_migrate import Migrate


app = Flask(__name__)
app.config.from_object('config.Config')

app.register_blueprint(home_handler)
app.register_blueprint(ping_handler)


db = SQLAlchemy(app)
migrate = Migrate(app, db)

# @app.route('/')
# def index():
#     return "This is an example app"

# @app.route('/create_list')
# def index():
#     return "This is the create list page"

# @app.route('/delete_list')
# def index():
#     return "This is an edit list page"

# @app.route('/create_product')
# def index():
#     return "This is an create product page"

# @app.route('/edit_product_list')
# def index():
#     return "This is an edit product page"