from flask import jsonify, Blueprint, request, make_response
from models.list import List
from database import db
from api.image_uploader import image_uploader
from api.auth_handler import token_getter
from config import PRODUCT_IMG_PRESET, CLOUDINARY_NAME
import json


list_handler = Blueprint('list_handler', __name__)


def replace_cloudinary_image(image_url):
    try: return image_uploader(image_url, PRODUCT_IMG_PRESET, CLOUDINARY_NAME)
    except: return image_url


@list_handler.route('/lists', methods=['GET', 'POST', 'PUT', 'DELETE'])
def listRequests():
    list_id = request.args.get('list_id', None)
    user_id = request.args.get('user_id', None)
    auth_token = token_getter()

    if request.method == 'GET':
        # checks to see if the client is logged-in, by seeing if an auth_token exists, if not then `auth_token = -1`
        if type(auth_token) is not int:
            auth_token = -1

        # 1|0| Case 1: Where only the list_id is provided
        if list_id:
            try:
                get_list = List.query.filter_by(id=list_id).first()
                list_privacy = get_list.private
                list_user_id = get_list.user_id
                if list_privacy == False or int(list_user_id) == int(auth_token):
                    return jsonify(get_list.serialize)
                else:
                    return jsonify({"error": "list is set to private"}), 403
            except Exception as e:
                return jsonify({'error': "{}".format(e.__cause__)}), 400

        # 0|1 Case 2: when user_id
        if user_id:
            try:
                if int(user_id) == int(auth_token):
                    lists = List.query.filter_by(user_id=user_id)
                    return jsonify([list.serialize for list in lists]), 200
                else:
                    lists = List.query.filter_by(
                        user_id=user_id, private=False)
                    return jsonify([list.serialize for list in lists]), 200
            except Exception as e:
                return jsonify({'error': "{}".format(e.__cause__)}), 400

    if request.method == 'POST':
        # client must be logged-in in order to create a list, client is only restricted to create list for their own account
        if type(auth_token) is not int:
            return jsonify({'error': "you must log in to create a list"}), 400

        else:
            body = json.loads(request.get_data())
            list_user_id = int(auth_token)
            list_name = body['name']

            # checks to see if list already exists
            if not List.query.filter_by(user_id=list_user_id, name=list_name).first():
                # checks to see if cloudinary works
                new_img_url = replace_cloudinary_image(body['img_url'])
                try:
                    list = List(list_user_id, list_name, new_img_url)
                    db.session.add(list)
                    db.session.commit()
                except Exception as e:
                    return jsonify({'error': "{}".format(e.__cause__)}), 400
                return jsonify({'response': 'list successfully added'}), 200
            else:
                return jsonify({'error': 'list already exists'}), 400

    if request.method == 'PUT':
        # client must be logged-in in order to edit a list, client is only restricted to editting their own lists
        if type(auth_token) is not int:
            return jsonify({'error': "you must log in to edit the list"}), 400

        else:
            list = List.query.get(int(list_id))
            if list.user_id == int(auth_token):
                try:
                    req = request.get_json()
                    list.name = req.get("name", list.name)
                    list.private = req.get("private", list.private)
                    if "img_url" in req:
                        list.img_url = replace_cloudinary_image(req["img_url"])
                    db.session.commit()
                    return jsonify({"response": "List '{}' was updated".format(list_id)}), 200

                except Exception as e:
                    return jsonify({'error': "{}".format(e.__cause__)}), 400
            else:
                return jsonify({'error': "unauthorized access"}), 401

    if request.method == 'DELETE':
        # client must be logged-in in order to delete a list, client is only restricted to deleting their own lists
        if type(auth_token) is not int:
            return jsonify({'error': "you must logged-in, to delete the list"}), 400

        else:
            list = List.query.get(int(list_id))
            if list.user_id == int(auth_token):
                try:
                    req = request.get_json()
                    db.session.delete(list)
                    db.session.commit()
                    return jsonify({'response': "Product '{}' was successfully deleted from the database".format(list)}), 200

                except Exception as e:
                    return jsonify({'error': "{}".format(e.__cause__)}), 400
            else:
                return jsonify({'error': "unauthorized access"}), 401
