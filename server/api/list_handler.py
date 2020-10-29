from flask import jsonify, Blueprint, request, make_response
from models.list import List
from database import db
from api.image_uploader import image_uploader
from api.auth_handler import token_getter
from config import PRODUCT_IMG_PRESET, CLOUDINARY_NAME
import json

list_handler = Blueprint('list_handler', __name__)

@list_handler.route('/lists', methods=['GET', 'POST'])
def listRequests():
    list_id = request.args.get('list_id', None)
    user_id = request.args.get('user_id', None)
    auth_token = token_getter()

    if request.method == 'GET':
        if list_id and user_id and auth_token:
            if int(user_id) == int(auth_token):
                try:
                    list=List.query.filter_by(id=list_id).first()
                except Exception as e:
                    return jsonify({'error': "{}".format(e.__cause__)}), 400
                return jsonify(List.query.filter_by(id=list_id).first().serialize)
        else:
            return jsonify({'error': "unauthorized access"}), 401
        
        # 0|1|1 Case 3: when user_id and auth_token is provided
        if user_id and auth_token:
            try:
                if int(user_id) == int(auth_token):
                    lists = List.query.filter_by(user_id=user_id)
                else:
                    print("token did not match user_id")
                    lists = List.query.filter_by(
                        user_id=user_id, private=False)
                    return jsonify([list.serialize for list in lists]), 200
                return jsonify([list.serialize for list in lists]), 200
            except Exception as e:
                return jsonify({'error': "{}".format(e.__cause__)}), 400
        
        # 1|0|0 Case 2: Where only the list_id is provided
        if list_id:
            try:
                list_privacy = List.query.filter_by(id=list_id).first().private
                if list_privacy == False:
                    return jsonify(List.query.filter_by(id=list_id).first().serialize)
                else:
                    return jsonify({"error": "list is set to private"}), 403
            except Exception as e:
                return jsonify({'error': "{}".format(e.__cause__)}), 400
        
    if request.method == 'POST':
            print("hello")
            body = json.loads(request.get_data())
            list_user_id = auth_token
            list_name = body['name']

            #checks to see if list already exists
            if not List.query.filter_by(user_id=list_user_id, name=list_name).first():
                # checks to see if cloudinary works
                try:
                    new_img_url = image_uploader(
                        body['img_url'], PRODUCT_IMG_PRESET, CLOUDINARY_NAME)
                except:
                    return jsonify({"error : uploading image on cloudinary"}), 400

                try:
                    list = List(list_user_id, list_name, new_img_url)
                    db.session.add(list)
                    db.session.commit()
                except Exception as e:
                    return jsonify({'error': "{}".format(e.__cause__)}), 400
                return jsonify({'response': 'list successfully added'}), 200
            else:
                return jsonify({'error': 'list already exists'}), 400

