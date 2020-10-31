from flask import jsonify, Blueprint, request
from models.list import List
from database import db
import json


list_handler = Blueprint('list_handler', __name__)


@list_handler.route('/lists/<id>', methods=['GET', 'DELETE', 'PUT'])
def oneListRequests(id):
    if request.method == 'GET':
        try:
            selected_list = List.query.get(int(id))
            return jsonify(selected_list.serialize), 200
        except Exception as e:
            return jsonify({'error': "{}".format(e.__cause__)}), 400

    if request.method == 'DELETE':
        try:        
            selected_list = List.query.get(int(id))
            db.session.delete(selected_list)
            db.session.commit()
            return jsonify({'response': "List '{}' was successfully deleted from the database".format(id)}), 200
        except Exception as e:
            return jsonify({'error': "{}".format(e.__cause__)}), 400    

    if request.method == "PUT":
        try:
            body = json.loads(request.get_data())
            selected_list = List.query.get(int(id))     
            if selected_list:       
                if "product_type" in body: selected_list.product_type = body["product_type"]
                if "visible" in body: selected_list.visible = body["visible"]
                db.session.commit()
                return jsonify({"response": "Product '{}' was updated".format(id)}), 200
        except Exception as e:
            return jsonify({'error': "{}".format(e.__cause__)}), 400

@list_handler.route('/lists', methods=['GET', 'POST'])
def allListRequests():
    if request.method == "GET":
        lists = List.query.all()
        return jsonify([single_list.serialize for single_list in lists]), 200

    if request.method == 'POST':
        try:
            body = json.loads(request.get_data())
            list_item = List(body['product_type'], body['visible'])
            db.session.add(list_item)
            db.session.commit()
            return jsonify({'response': "{} was successfully added to the database".format(body['product_type'])}), 200
        except Exception as e:
            return jsonify({'error': "{}".format(e.__cause__)}), 400
        