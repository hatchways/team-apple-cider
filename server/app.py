from flask import Flask, jsonify, request
from api.ping_handler import ping_handler
from api.home_handler import home_handler
from flask_sqlalchemy import SQLAlchemy
from flask_migrate import Migrate
import json


app = Flask(__name__)
app.config.from_object('config.Config')

app.register_blueprint(home_handler)
app.register_blueprint(ping_handler)

db = SQLAlchemy(app)
migrate = Migrate(app, db)

from models import List, Product

@app.route('/create_list',methods=['POST'])
def createList():
    if request.method == 'POST':
        body = json.loads(request.get_data())
        list_item = List(body['product_type'])
        db.create_all()
        db.session.add(list_item)
        try:
            db.session.commit()
        except:
            return jsonify({'response': "{} already exists in the database".format(body['product_type'])}), 400
    return jsonify({'response': "{} was successfully added to the database".format(body['product_type'])}), 200


@app.route('/add_product',methods=['GET','POST'])
def addProduct():
    if request.method == "GET":
        product_types = List.query.all()
        ls = []
        for i in product_types:
            ls.append({"id":i.id, "product_type":i.product_type})
        return jsonify({'list':ls}), 200
        
    elif request.method == 'POST':
        body = json.loads(request.get_data())
        product_item = Product(body['list_id'],body['description'], body['name'],body['url'],body['price'])
        db.create_all()
        db.session.add(product_item)
        try:
            db.session.commit()
        except:
            return jsonify({'response': "{} already exists in the database".format(body['name'])}), 400
    return jsonify({'response': "{} was successfully added to the database".format(body['name'])}), 200

# instructions: run flask first and then retrieve the files.
# TODO: still have to do edit product list






# @app.route('/create_product')
# def index():
#     return "This is an create product page"

# @app.route('/edit_product_list')
# def index():
#     return "This is an edit product page"



