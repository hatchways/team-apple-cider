from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from flask_migrate import Migrate


app = Flask(__name__)
app.config.from_object('config.Config')

db = SQLAlchemy(app)
migrate = Migrate(app, db)


from api.ping_handler import ping_handler
from api.home_handler import home_handler
from api.database_handler import database_handler

app.register_blueprint(home_handler)
app.register_blueprint(ping_handler)
app.register_blueprint(database_handler)
    
