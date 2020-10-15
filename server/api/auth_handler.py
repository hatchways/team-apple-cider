from models.models import User
from flask import Blueprint, request, make_response, jsonify
from flask.views import MethodView
from server import db, flask_bcrypt

auth_blueprint = Blueprint("auth_blueprint", __name__)


class RegisterAPI(MethodView):
    def post(self):
        post_data = request.get_json()
        user = User.query.filter_by(
            email=post_data.get("email")
        ).first()
        if not user:
            try:
                if len(post_data.get("password")) < 6:
                    responseObject = {
                        "status": "fail",
                        "message": "Password must be at least six characters long."
                    }
                    return make_response(jsonify(responseObject)), 401
                if post_data.get("password") != post_data.get("confirm_password"):
                    responseObject = {
                        "status": "fail",
                        "message": "Passwords must match."
                    }
                user = User(
                    email=post_data.get("email"),
                    password=post_data.get("password")
                )
                db.session.add(user)
                db.session.commit()
                auth_token = user.encode_auth_token(user.id)
                responseObject = {
                    "status": "success",
                    "message": "Successfully registered.",
                    "auth_token": auth_token.decode()
                }
                return make_response(jsonify(responseObject)), 201
            except Exception as e:
                responseObject = {
                    "status": "fail",
                    "message": "Some error occurred. Please try again."
                }
                return make_response(jsonify(responseObject)), 401
        else:
            responseObject = {
                "status": "fail",
                "message": "User already exists. Please log in."
            }
            return make_response(jsonify(responseObject)), 202


class LoginAPI(MethodView):
    def post(self):
        post_data = request.get_json()
        try:
            user = User.query.filter_by(
                email=post_data.get("email")
            ).first()
            if user and flask_bcrypt.check_password_hash(
                user.password, post_data.get("password")
            ):
                auth_token = user.encode_auth_token(user.id)
                if auth_token:
                    responseObject = {
                        "status": "success",
                        "message": "Successfully logged in",
                        "auth_token": auth_token.decode()
                    }
                    return make_response(jsonify(responseObject)), 200
                else:
                    responseObject = {
                        "status": "fail",
                        "message": "User does not exist."
                    }
                    return make_response(jsonify(responseObject)), 404
        except Exception as e:
            print(e)
            responseObject = {
                "status": "fail",
                "message": "Try again"
            }
            return make_response(jsonify(responseObject)), 500


class UserAPI(MethodView):
    def get(self):
        auth_header = request.headers.get("Authorization")
        if auth_header:
            auth_token = auth_header.split(" ")[1]
        else:
            auth_token = ""
        if auth_token:
            resp = User.decode_auth_token(auth_token)
            if not isinstance(resp, str):
                user = User.query.filter_by(id=resp).first()
                responseObject = {
                    "status": "success",
                    "data": {
                        "user_id": user.id,
                        "email": user.email,
                        "registered_time": user.registered_time
                    }
                }
                return make_response(jsonify(responseObject)), 200
            responseObject = {
                "status": "fail",
                "message": resp
            }
            return make_response(jsonify(responseObject)), 401
        else:
            responseObject = {
                "status": "fail",
                "message": "Provide a valid auth token."
            }
            return make_response(jsonify(responseObject)), 401


registration_view = RegisterAPI.as_view("register_api")
login_view = LoginAPI.as_view("login_api")
user_view = UserAPI.as_view("user_api")

auth_blueprint.add_url_rule(
    "/auth/register",
    view_func=registration_view,
    methods=["POST"]
)
auth_blueprint.add_url_rule(
    "/auth/login",
    view_func=login_view,
    methods=["POST"]
)
auth_blueprint.add_url_rule(
    "/auth/status",
    view_func=user_view,
    methods=["GET"]
)
