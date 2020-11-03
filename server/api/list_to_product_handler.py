from flask import jsonify, Blueprint, request
from models.list_to_product import ListToProduct
from models.list import List
from database import db
from api.auth_handler import token_getter
import json


list_to_product_handler = Blueprint('list_to_product_handler', __name__)


@list_to_product_handler.route('/list-to-products/<list_id>', methods=['GET', 'POST'])
def listToProductsRequest(list_id):
    auth_token = token_getter()

    if request.method == 'GET':
        try:
            list = List.query.filter_by(id=int(list_id)).first()
            list_user_id = list.user_id
            list_privacy = list.private

            if list_user_id == auth_token or list_privacy == False:
                products_in_list = ListToProduct.query.filter_by(
                    list_id=list_id)
                return jsonify([product.serialize for product in products_in_list])
            else:
                return jsonify({"error": "user has set list to private"})

        except Exception as e:
            return jsonify({'error': "{}".format(e.__cause__)}), 400

    # can only add a product to a list if logged-in and the list is owned by the user
    if request.method == 'POST':
        if type(auth_token) is not int:
            return jsonify({'error': "you must log in to add a product to a list"}), 400
        else:
            try:
                list_user_id = List.query.filter_by(
                    id=int(list_id)).first().user_id
                body = request.get_json()
                list_to_product = ListToProduct.query.filter_by(
                    list_id=int(list_id), product_id=body['product_id'])
                if int(list_user_id) == int(auth_token) and not list_to_product:
                    list_product_connection = ListToProduct(
                        int(list_id), body['product_id'])
                    db.session.add(list_product_connection)
                    db.session.commit()
                else:
                    return jsonify({"error": "you are unauthorized to add to the list or product was already added"})
                return jsonify({'response': "item was successfully added to the list"}), 200

            except Exception as e:
                return jsonify({'error': "{}".format(e.__cause__)}), 400


@list_to_product_handler.route('/list-to-products/<list_id>/<product_id>', methods=['DELETE'])
def listToProductRequest(list_id, product_id):
    auth_token = token_getter()
    if request.method == 'DELETE':
        if type(auth_token) is not int:
            return jsonify({'error': "you must log in to delete a product from the list"}), 400
        try:
            list_to_product = ListToProduct.query.filter_by(
                list_id=int(list_id), product_id=product_id).first()
            list_user_id = List.query.filter_by(id=int(list_id)).first().user_id
            
            if int(list_user_id) == int(auth_token) and list_to_product:
                print('hello')
                db.session.delete(list_to_product)
                
                db.session.commit()
                return jsonify({'response': "Product '{}' was successfully deleted from the List '{}'".format(product_id, list_id)}), 200
            else:
                return jsonify({"error": "unauthorized access or list connection does not exist"})
        except Exception as e:
            print(e)
            return jsonify({'error': "{}".format(e.__cause__)}), 400
