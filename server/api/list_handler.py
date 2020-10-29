from flask import jsonify, Blueprint, request
from models.list import List
from database import db
from api.image_uploader import image_uploader
from config import PRODUCT_IMG_PRESET, CLOUDINARY_NAME
import json

list_handler = Blueprint('list_handler', __name__)

@list_handler.route('/lists', methods=['GET','DELETE','POST'])
def listRequests():
    list_id = request.args.get('list_id', None)
    user_id = request.args.get('user_id', None)
    # temporary fix, ideally we want to get the token_user_id from the cookies
    token_user_id = request.args.get('token_user_id', None)

    # one_list
    if request.method == 'GET':

        # 1|1|1 Case 1: When all 3 are provided
        if list_id and user_id and token_user_id:
            if user_id == token_user_id:
                try:
                    list = List.query.filter_by(id=list_id).first()
                except Exception as e:
                    return jsonify({'error': "{}".format(e.__cause__)}), 400
                return jsonify(list.serialize)
            else:
                return jsonify({'error': "unauthorized access"}), 401

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

        # 0|1|1 Case 3: when user_id and token_user_id is provided
        if user_id and token_user_id:  
            try:
                if user_id == token_user_id:
                    lists = List.query.all().filter_by(user_id=user_id)
                else:
                    lists = List.query.all().filter_by(user_id=user_id, private=False)
                    return jsonify([list.serialize for list in lists]), 200
            except Exception as e:
                        return jsonify({'error': "{}".format(e.__cause__)}), 400


    if request.method == 'DELETE':
        try:
            list_user_id = List.query.filter_by(id=list_id).first().user_id
            if list_user_id == token_user_id:
                list = List.query.filter_by(id=list_id).first()
                db.session.delete(list)
                db.session.commit()
                return jsonify({'response': "List '{}' was successfully deleted from the database".format(list_id)}), 200
            else:
                return jsonify({'error': "unauthorized access"}), 401
        except Exception as e:
                return jsonify({'error': "{}".format(e.__cause__)}), 400
    
    if request.method == 'POST':
        body = json.loads(request.get_data())
        list_user_id = List(body['list_user_id'])
        list_name = List(body['name'])

        if not List.query.filter_by(list_id=list_user_id,name=list_name).first():
            # checks to see if cloudinary works
            try:
                new_img_url = image_uploader(
                    body['img_url'], PRODUCT_IMG_PRESET, CLOUDINARY_NAME)
            except:
                return jsonify({"error : uploading image on cloudinary"}), 400
         
            try:
                product_item = List(
                    body['user_id'], body['name'], new_img_url)
                db.session.add(product_item)
                db.session.commit()
            except Exception as e:
                return jsonify({'error': "{}".format(e.__cause__)}), 400
        else:
            return jsonify({'error': 'list already exists'}), 400
    
    if request.method == "PUT":
        req = request.get_json()
        try:
            list_user_id = List.query.filter_by(id=req['list_id']).first().user_id
            if list_user_id == token_user_id:         
                if "name" in req: product.name = req["name"]
                if "img_url" in req: 
                    try:
                        new_img_url = image_uploader(
                        req["img_url"], PRODUCT_IMG_PRESET, CLOUDINARY_NAME)
                    except:
                        return jsonify({"error : uploading image on cloudinary"}), 400
                    product.img_url = new_img_url
                db.session.commit()
            return jsonify({"response" : "Product '{}' was updated".format(product_id)}), 200
        else:
            return jsonify({"error":"Product does not exist, can't update"}), 400
