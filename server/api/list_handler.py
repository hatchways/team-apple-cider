from flask import jsonify, Blueprint, request
from models.list import List
from database import db
import json


list_handler = Blueprint('list_handler', __name__)


@list_handler.route('/lists/<list_id>', methods=['GET', 'DELETE'])
def oneListRequests(list_id):
    if request.method == 'GET':
        try:
            selected_list = List.query.get(list_id)
            return jsonify(selected_list.serialize), 200
        except Exception as e:
            return jsonify({'error': "{}".format(e.__cause__)}), 400

    if request.method == 'DELETE':
        try:        
            selected_list = List.query.get(list_id)
            db.session.delete(selected_list)
            db.session.commit()
            return jsonify({'response': "List '{}' was successfully deleted from the database".format(list_id)}), 200
        except Exception as e:
            return jsonify({'error': "{}".format(e.__cause__)}), 400    


@list_handler.route('/lists', methods=['GET', 'POST'])
def allListRequests():
    if request.method == "GET":
        product_types = List.query.all()
        product_types_ls = []
        for item in product_types:
            product_types_ls.append(
                {
                    "id": item.id,
                    "product_type": item.product_type
                })
        return jsonify({'list': product_types_ls}), 200

    if request.method == 'POST':
        try:
            body = json.loads(request.get_data())
            list_item = List(body['product_type'], body['visible'])
            db.session.add(list_item)
            db.session.commit()
            return jsonify({'response': "{} was successfully added to the database".format(body['product_type'])}), 200
        except Exception as e:
            return jsonify({'error': "{}".format(e.__cause__)}), 400
        