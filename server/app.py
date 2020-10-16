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

@app.route('/create_list', methods=['POST'])
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


@app.route('/add_product', methods=['GET', 'POST'])
def addProduct():
    if request.method == "GET":
        product_types = List.query.all()
        ls = []
        for item in product_types:
            ls.append(
                {
                    "id": item.id,
                    "product_type": item.product_type
                })
        return jsonify({'list': ls}), 200

    elif request.method == 'POST':
        body = json.loads(request.get_data())
        product_item = Product(
            body['list_id'], body['name'], body['description'], body['price'], body['url'])
        db.create_all()
        db.session.add(product_item)
        try:
            db.session.commit()
        except:
            return jsonify({'response': "{} already exists in the database".format(body['name'])}), 400
    return jsonify({'response': "{} was successfully added to the database".format(body['name'])}), 200


@app.route('/edit_list', methods=['GET', 'DELETE'])
def editList():

    if request.method == "GET":
        body = json.loads(request.get_data())
        list_id = body['list_id']
        products = Product.query.filter_by(list_id=list_id)
        product_type = List.query.filter_by(id=list_id).first()
        ls = []
        for prod in products:
            ls.append(
                {
                    "id": prod.id,
                    "name": prod.name,
                    "description": prod.description,
                    "price": prod.price,
                    "url": prod.url
                })
        return jsonify({product_type.product_type: ls}), 200
    
    if request.method == "DELETE":
        body = json.loads(request.get_data())
        product_id = body['product_id']
        product_name = Product.query.filter_by(id=product_id).first().name
        Product.query.filter_by(id=product_id).delete()
        db.session.commit()
        return jsonify({'response': "{} was successfully deleted from the database".format(product_name)}), 200


    
