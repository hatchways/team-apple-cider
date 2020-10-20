from flask import Flask
from database import db
from api.ping_handler import ping_handler
from api.home_handler import home_handler
from api.auth_handler import auth_handler
from api.product_handler import product_handler
from api.list_handler import list_handler
from flask_migrate import Migrate
from flask_bcrypt import Bcrypt
from flask_cors import CORS

migrate = Migrate()
cors = CORS()
flask_brcypt = Bcrypt()



def create_app():
    app = Flask(__name__)
    app.config.from_object('config.DevelopmentConfig')

    db.init_app(app)
    migrate.init_app(app, db)
    cors.init_app(app)
    flask_brcypt.init_app(app)

    with app.app_context():

        # Register Blueprints
        app.register_blueprint(home_handler)
        app.register_blueprint(ping_handler)
        app.register_blueprint(auth_handler)
        app.register_blueprint(product_handler)
        app.register_blueprint(list_handler)

        db.create_all()
        return app


app = create_app()
