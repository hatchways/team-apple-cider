from database import db
from flask import jsonify, Blueprint, request
from models.followers import Follower
import json

followers_handler = Blueprint('followers_handler', __name__)


@follower_handler.route('/followers', methods=['GET', 'POST', 'DELETE'])
def followerRequests():
    if request.method == "GET":

    if request.method == 'POST':
        body = json.loads(request.get_data())
        user_id = body['user_id']
        follower_id = body['follower_id']
        if not Follower.query.filter_by(user_id=user_id,follower_id=follower_id):
            new_follower = Follower(int(user_id),int(follower_id))
            db.session.add(new_follower)
            return
        else:
            return jsonify({"error : follower already exists"}), 200

