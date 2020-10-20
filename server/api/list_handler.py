import json
from flask import jsonify, Blueprint, request
from models.list import List
from database import db

list_handler = Blueprint('list_handler', __name__)


@list_handler.route('/list', methods=['GET', 'POST', 'DELETE'])
def listRequests():
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
        body = json.loads(request.get_data())
        list_item = List(body['product_type'])
        db.session.add(list_item)
        try:
            db.session.commit()
        except Exception as e:
            return jsonify({'error': "{}".format(e.__cause__)}), 400
        return jsonify({'response': "{} was successfully added to the database".format(body['product_type'])}), 200
    if request.method == 'DELETE':
        body = json.loads(request.get_data())
        list_id = body['list_id']
        product_type = List.query.filter_by(id=list_id).first().id
        List.query.filter_by(id=list_id).delete()
        db.session.commit()
        return jsonify({'response': "the {} was successfully deleted from the database".format(product_type)}), 200
