from flask import Flask
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