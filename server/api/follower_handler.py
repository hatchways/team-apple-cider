from flask import jsonify, Blueprint
from models.user import User
from database import db
from api.auth_handler import token_getter

follower_handler = Blueprint('follower_handler', __name__)


@follower_handler.route('/followers/<user_id>', methods=['GET'])
def getFollowers(user_id):
    auth_token = token_getter()
    try:
        user = User.query.get(user_id)
        followers = user.followers.all()
        return jsonify([user.serialize for user in followers]), 200
    except Exception as e:
        return jsonify({'error': "{}".format(e.__cause__)}), 400


@follower_handler.route('/followings/<user_id>', methods=['GET'])
def getFollowings(user_id):
    auth_token = token_getter()
    try:
        user = User.query.get(user_id)
        followings = user.followed.all()
        return jsonify([user.serialize for user in followings]), 200
    except Exception as e:
        return jsonify({'error': "{}".format(e.__cause__)}), 400


@follower_handler.route('/follow/<user_id>', methods=['GET'])
def followUser(user_id):
    auth_token = token_getter()
    if type(auth_token) is not int:
        return jsonify({"error": "must be signed in to follow users"}), 400
    else:
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
            return jsonify({'response': "you've successfully followed user {}".format(user_id)}), 400


@follower_handler.route('/unfollow/<user_id>', methods=['GET'])
def unfollowUser(user_id):
    auth_token = token_getter()
    if type(auth_token) is not int:
        return jsonify({"error": "must be signed in to unfollow users"}), 400
    else:
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
            return jsonify({'response': "you've successfully unfollowed user {}".format(user_id)}), 400
