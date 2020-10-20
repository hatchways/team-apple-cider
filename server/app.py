from flask import Flask
from flask_migrate import Migrate
from database import db
from api.ping_handler import ping_handler
from api.home_handler import home_handler
from api.product_handler import product_handler
from api.list_handler import list_handler

migrate = Migrate()


def create_app():
    app = Flask(__name__)
    app.config.from_object('config.Config')


    db.init_app(app)
    migrate.init_app(app, db)

    with app.app_context():

        # Register Blueprints
        app.register_blueprint(home_handler)
        app.register_blueprint(ping_handler)
        app.register_blueprint(product_handler)
        app.register_blueprint(list_handler)

        db.create_all()
        return app

app = create_app()