from flask import jsonify, Blueprint, request
from models.user import User
from database import db
from api.auth_handler import token_getter

follower_handler = Blueprint('follower_handler', __name__)


@follower_handler.route('/followers', methods=['GET'])
def getFollowers():
    auth_token = token_getter()
    try:
        user = User.query.get(auth_token)
        followers = user.followers.all()
        return jsonify([user.serialize for user in followers]), 200
    except Exception as e:
        return jsonify({'error': "{}".format(e.__cause__)}), 400


@follower_handler.route('/followings', methods=['GET'])
def getFollowings():
    auth_token = token_getter()
    try:
        user = User.query.get(auth_token)
        followings = user.followed.all()
        return jsonify([user.serialize for user in followings]), 200
    except Exception as e:
        return jsonify({'error': "{}".format(e.__cause__)}), 400

@follower_handler.route('/follower_relation/<user_id>', methods=['GET'])
def getRelation(user_id):
    auth_token = token_getter()
    try:
        loggedin_user = User.query.get(auth_token)
        target_user = User.query.get(user_id)
        following = (target_user.id in [user.serialize['id'] for user in loggedin_user.followed.all()])
        follows_back = (loggedin_user.id in [user.serialize['id'] for user in target_user.followed.all()])
        return jsonify({"following": following, "follows_back": follows_back}), 200
    except Exception as e:
        return jsonify({'error': "{}".format(e.__cause__)}), 400

@follower_handler.route('/followers/<user_id>', methods=['POST', 'DELETE'])
def followersReqs(user_id):
    auth_token = token_getter()
    if type(auth_token) is not int:
        return jsonify({"error": "must be signed in to follow users"}), 400

    if request.method == 'POST':
        if user_id == auth_token:
            return jsonify({"error": "you can't follow yourself"}), 400
        else:
            try:
                user = User.query.get(auth_token)
                follow_user = User.query.get(user_id)
                user.follow(follow_user)
                db.session.commit()
            except Exception as e:
                return jsonify({'error': "{}".format(e.__cause__)}), 400
            return jsonify({'response': "you've successfully followed user {}".format(user_id)}), 200

    if request.method == 'DELETE':
        if user_id == auth_token:
            return jsonify({"error": "you can't unfollow yourself"}), 400
        else:
            try:
                user = User.query.get(auth_token)
                unfollow_user = User.query.get(user_id)
                user.unfollow(unfollow_user)
                db.session.commit()
            except Exception as e:
                return jsonify({'error': "{}".format(e.__cause__)}), 400
            return jsonify({'response': "you've successfully unfollowed user {}".format(user_id)}), 200
