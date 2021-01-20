from flask import Flask
from database import db
from bcrypt_file import bcrypt
from flask_migrate import Migrate
from flask_cors import CORS
from sockets import SocketIO, attach_events
from api.ping_handler import ping_handler
from api.home_handler import home_handler
from api.auth_handler import auth_handler
from api.product_handler import product_handler
from api.list_handler import list_handler
from api.scrape_handler import scrape_handler
from api.list_to_product_handler import list_to_product_handler
from api.prices_handler import prices_handler
from api.profile_handler import profile_handler
from api.follower_handler import follower_handler

# from api.celery_api.scheduled_tasks import scheduled_tasks

# import eventlet
import os
# from sockets import SocketIO, attach_events

migrate = Migrate()
cors = CORS()
# socketio = SocketIO()


def create_app():
    app = Flask(__name__)
    app.config.from_object('config.DevelopmentConfig')
    db.init_app(app)
    migrate.init_app(app, db)
    cors.init_app(app)
    bcrypt.init_app(app)
    # socketio.init_app(app)

    # socketio.run(app)
    # attach_events(socketio)

    with app.app_context():

        # Register Blueprints
        app.register_blueprint(home_handler)
        app.register_blueprint(ping_handler)
        app.register_blueprint(auth_handler)
        app.register_blueprint(product_handler)
        app.register_blueprint(prices_handler)
        app.register_blueprint(list_handler)
        app.register_blueprint(list_to_product_handler)
        app.register_blueprint(scrape_handler)
        app.register_blueprint(profile_handler)
        # app.register_blueprint(scheduled_tasks)
        app.register_blueprint(follower_handler)

        db.create_all()
        return app


# create_app()

if __name__ == "__main__":
    app = create_app()
    app.run(host='0.0.0.0', port=os.environ.get('PORT', 5000))
