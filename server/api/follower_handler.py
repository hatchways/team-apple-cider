from flask import jsonify, Blueprint
from models.user import User
from database import db
from api.auth_handler import token_getter

follower_handler = Blueprint('follower_handler', __name__)
auth_token = token_getter()            

@follower_handler.route('/followers/<user_id>' , methods=['GET'])
def getFollowers():
    pass


@follower_handler.route('/following/<user_id>', methods=['GET'])
def getFollowings():
    pass


@follower_handler.route('/follow/<user_id>', methods=['GET'])
def followUser():
    pass


@follower_handler.route('/unfollow/<user_id>', methods=['GET'])
def unfollowUser():
    pass
