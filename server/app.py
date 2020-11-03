from flask import Flask
from database import db
from server import migrate,cors,flask_bcrypt
from api.ping_handler import ping_handler
from api.home_handler import home_handler
from api.auth_handler import auth_handler
from api.product_handler import product_handler
from api.list_handler import list_handler
from api.scrape_handler import scrape_handler
from api.list_to_product_handler import list_to_product_handler
from api.prices_handler import prices_handler 


def create_app():
    app = Flask(__name__)
    app.config.from_object('config.DevelopmentConfig')

    db.init_app(app)

    migrate.init_app(app, db)
    cors.init_app(app)
    flask_bcrypt.init_app(app)

    with app.app_context():

        # Register Blueprints
        app.register_blueprint(home_handler)
        app.register_blueprint(ping_handler)
        app.register_blueprint(auth_handler)
        app.register_blueprint(product_handler)
        app.register_blueprint(list_handler)
        app.register_blueprint(scrape_handler) 
        app.register_blueprint(list_to_product_handler) 
        app.register_blueprint(prices_handler) 

        db.create_all()
        return app
