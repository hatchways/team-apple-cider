import json, re
from flask import jsonify, request, Blueprint
from models.profile import Profile
from database import db
profile_handler = Blueprint('profile_handler', __name__)


def create_profile(id, name, photo):
    price_entry = Profile(id, name, photo)
    db.session.add(price_entry)
    db.session.commit()


@profile_handler.route('/profile/<id>', methods=['GET', 'POST', 'DELETE'])
def single_profile_requests(id):
    if request.method == 'GET':
        try:
            profile = Profile.query.get(id)
            return jsonify(profile.serialize), 200
        except Exception as e:
            return jsonify({'error': "{}".format(e.__cause__)}), 400

    if request.method == 'DELETE':
        try:
            profile = Profile.query.get(id)
            db.session.delete(profile)
            db.session.commit()
            return jsonify({'response': "Profile '{}' was successfully deleted from the database".format(id)}), 200
        except Exception as e:
            return jsonify({'error': "{}".format(e.__cause__)}), 400    
    

@profile_handler.route('/profile', methods = ['GET'])
def all_profile_requests():
    if request.method == 'GET':
        try:
            profiles = Profile.query.all()
            return jsonify([profile.serialize for profile in profiles]), 200
        except Exception as e:
            return jsonify({'error': "{}".format(e.__cause__)}), 400    

