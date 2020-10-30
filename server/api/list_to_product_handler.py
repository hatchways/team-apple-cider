from flask import jsonify, Blueprint, request
from models.list_to_product import ListToProduct
from models.list import List
from database import db
from api.auth_handler import token_getter
import json


list_to_product_handler = Blueprint('list_to_product_handler', __name__)


@list_to_product_handler.route('/list-to-products/<list_id>', methods=['GET', 'POST'])
def listProductsRequest(list_id):
    auth_token = token_getter()

    if request.method == 'GET':
        try:
            list_user_id = List.query.filter_by(
                id=int(list_id)).first().user_id
            list_privacy = List.query.filter_by(
                id=int(list_id)).first().private

            if list_user_id == auth_token or list_privacy == False:
                products_in_list = ListToProduct.query.filter_by(
                    list_id=list_id)
                return jsonify([product.serialize for product in products_in_list])
            else:
                return jsonify({"error": "user has set list to private"})

        except Exception as e:
            return jsonify({'error': "{}".format(e.__cause__)}), 400

    if request.method == 'POST':
        try:
            list_user_id = List.query.filter_by(
                id=int(list_id)).first().user_id

            body = request.get_json()
            if list_user_id == auth_token:
                print(int(list_id))
                list_product_connection = ListToProduct(
                    int(list_id), body['product_id'])
                db.session.add(list_product_connection)
                db.session.commit()
            else:
                return jsonify({"error": "you are unauthorized to add to the list"})
            return jsonify({'response': "item was successfully added to the list"}), 200

        except Exception as e:
            return jsonify({'error': "{}".format(e.__cause__)}), 400
