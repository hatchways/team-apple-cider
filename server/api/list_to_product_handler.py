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
            list_user_id = List.query.filter_by(list_id=int(list_id)).user_id
            list_privacy = List.query.filter_by(list_id=int(list_id)).private

            if list_user_id == auth_token or list_privacy == False:
                products_in_list = ListToProduct.query.filter_by(list_id=list_id)
                return jsonify([product.serialize for product in products_in_list])
            else:
                return jsonify({"error": "user has set list to private"})

        except Exception as e:
            return jsonify({'error': "{}".format(e.__cause__)}), 400

    # if request.method == 'POST':
    #     if List.query.filter_by(user_id=int(auth_token)):


            # Already got Delete request started for Ticket #47 (Mila)
            # if request.method == 'DELETE':
            #     products_in_list = ListToProduct.query.filter_by(list_id=list_id)
            #     db.session.delete(products_in_list)
            #     try:
            #         db.session.commit()
            #     except Exception as e:
            #             return jsonify({'error': "{}".format(e.__cause__)}), 400
            #     return jsonify({'response': "List '{}' was successfully deleted from the database".format(list_id)}), 200

         # Already got Delete request started for Ticket #47 (Mila)
            # @list_to_product_handler.route('/list-to-products/<list_id>/<product_id>',methods=['DELETE'])
            # def onelistProductsRequest(list_id,product_id):
            #     if request.method == 'DELETE':
            #         product_in_list = ListToProduct.query.filter_by(list_id=list_id, product_id=product_id)
            #         db.session.delete(product_in_list)
            #         try:
            #             db.session.commit()
            #         except Exception as e:
            #             return jsonify({'error': "{}".format(e.__cause__)}), 400
            #         return jsonify({'response': "Product '{}' was successfully deleted from the List'{}'".format(list_id)}), 200


@list_to_product_handler.route('/list-to-products', methods=['POST'])
def allListProductsRequest():
    if request.method == 'POST':
        body = json.loads(request.get_data())
        list_id = body['list_id']
        product_id = body['product_id']

        if not ListToProduct.query.filter_by(list_id=list_id, product_id=product_id).first():
            try:
                list_product_connection = ListToProduct(list_id, product_id)
                db.session.add(list_product_connection)
                db.session.commit()
            except Exception as e:
                return jsonify({'error': "{}".format(e.__cause__)}), 400
            return jsonify({'response': "{} was successfully added to the database".format(body['name'])}), 200
        else:
            return jsonify({'error': 'product already exists in list'}), 400
