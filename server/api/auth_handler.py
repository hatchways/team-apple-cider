from models.user import User
from models.profile import Profile
from flask import Blueprint, request, make_response, jsonify, g, redirect, url_for
from flask.views import MethodView
from database import db
from server import flask_bcrypt
from functools import wraps
auth_handler = Blueprint("auth_handler", __name__)


# Wrapper that obtains and verifies an auth token in a cookie. Returns true if valid, false otherwise.
def login_cookie_getter(f):
    @wraps(f)
    def decorated_function(*args, **kwargs):
        try:
            auth_header = request.cookies.get("Authentication token")
            if auth_header:
                auth_token = auth_header
                auth_token = User.decode_auth_token(auth_token)
                if not isinstance(auth_token, str):
                    g.user = User.query.filter_by(id=auth_token).first()
                else:
                    raise Exception
            else:
                raise Exception
        except:
            responseObject = {
                "status": "fail",
                "message": "User is not logged in."
            }
            return make_response(jsonify(responseObject)), 401
        return f(None)
    return decorated_function


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
                if post_data.get("password") != post_data.get("confirm"):
                    responseObject = {
                        "status": "fail",
                        "message": "Passwords must match."
                    }
                    return make_response(jsonify(responseObject)), 401

                user = User(
                    email=post_data.get("email"),
                    name=post_data.get("name"),
                    password=post_data.get("password")
                )
                db.session.add(user)
                db.session.commit()

                profile = Profile(user.id, post_data.get("name"), None)
                db.session.add(profile)
                db.session.commit()

                auth_token = user.encode_auth_token(user.id)
                g.user = user

                responseObject = {
                    "status": "success",
                    "message": "Successfully registered.",
                    "id": user.id
                }
                resp = make_response(jsonify(responseObject))
                resp.set_cookie("Authentication token",
                                auth_token, httponly=True)
                return resp, 201
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
            return make_response(jsonify(responseObject)), 409


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
                        "message": "Successfully logged in"
                    }
                    resp = make_response(jsonify(responseObject))
                    resp.set_cookie("Authentication token",
                                    auth_token, httponly=True)
                    return resp, 200
                else:
                    responseObject = {
                        "status": "fail",
                        "message": "User does not exist."
                    }
                    return make_response(jsonify(responseObject)), 404
            elif user:
                responseObject = {
                    "status": "fail",
                    "message": "Password is incorrect."
                }
                return make_response(jsonify(responseObject)), 401
            else:
                responseObject = {
                    "status": "fail",
                    "message": "User does not exist."
                }
                return make_response(jsonify(responseObject)), 404
        except Exception as e:
            responseObject = {
                "status": "fail",
                "message": "Try again"
            }
            return make_response(jsonify(responseObject)), 500


class UserAPI(MethodView):
    @login_cookie_getter
    def get(self):
        user = g.user
        responseObject = {
            "status": "success",
            "data": {
                "user_id": user.id,
                "email": user.email,
                "registered_time": user.registered_time
            }
        }
        return make_response(jsonify(responseObject)), 200


# Basic middleware for protected routes pulled from Flask's documentation.
def login_required(f):
    @wraps(f)
    @login_cookie_getter
    def decorated_function(*args, **kwargs):
        if g.user is None:
            return redirect(url_for('login', next=request.url))
        return f(*args, **kwargs)
    return decorated_function


registration_view = RegisterAPI.as_view("register_api")
login_view = LoginAPI.as_view("login_api")
user_view = UserAPI.as_view("user_api")

auth_handler.add_url_rule(
    "/auth/register",
    view_func=registration_view,
    methods=["POST"]
)
auth_handler.add_url_rule(
    "/auth/login",
    view_func=login_view,
    methods=["POST"]
)
auth_handler.add_url_rule(
    "/auth/status",
    view_func=user_view,
    methods=["GET"]
)
