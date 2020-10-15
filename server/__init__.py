from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from flask_bcrypt import Bcrypt
from config import DevelopmentConfig


app = Flask(__name__)
app.config.from_object(DevelopmentConfig)
db = SQLAlchemy(app)
flask_bcrypt = Bcrypt(app)