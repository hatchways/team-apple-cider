from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from flask_bcrypt import Bcrypt
from config import DevelopmentConfig


# I moved the app initialization here because when it was in app.py, importing auth_handler created
# an infinite loop. Open to suggestions if there is a cleaner way to do this!
app = Flask(__name__)
app.config.from_object(DevelopmentConfig)
db = SQLAlchemy(app)
flask_bcrypt = Bcrypt(app)