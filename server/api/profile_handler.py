import json, re
from flask import jsonify, request, Blueprint
from models.profile import Profile
from database import db
from config import PROFILE_IMG_PRESET
from .image_uploader import replace_cloudinary_image


product_handler = Blueprint('product_handler', __name__)




profile_handler = Blueprint('profile_handler', __name__)

@profile_handler.route('/profiles/<id>', methods=['GET', 'PUT'])
def single_profile_requests(id):
    if request.method == 'GET':
        try:
            profile = Profile.query.get(int(id))
            return jsonify(profile.serialize), 200
        except Exception as e:
            return jsonify({'error': "{}".format(e.__cause__)}), 400

    if request.method == 'PUT':
        try:
            body = request.get_json()
            profile = Profile.query.get(id)
            if profile:             
                if "name" in body: profile.name = body["name"]
                if "photo" in body: profile.photo = replace_cloudinary_image(body["photo"], PROFILE_IMG_PRESET)
                db.session.commit()
                return jsonify({"response": "Profile '{}' info was updated".format(id)}), 200
        except Exception as e:
            return jsonify({'error': "{}".format(e.__cause__)}), 400
        


@profile_handler.route('/profiles', methods = ['GET'])
def all_profile_requests():
    if request.method == 'GET':
        try:
            profiles = Profile.query.all()
            return jsonify([profile.serialize for profile in profiles]), 200
        except Exception as e:
            return jsonify({'error': "{}".format(e.__cause__)}), 400    

