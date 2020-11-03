from models.user import User
from models.blacklist_token import BlacklistToken
from flask import Blueprint, request, make_response, jsonify, g, redirect, url_for
from flask.views import MethodView
from database import db
from server import flask_bcrypt
from functools import wraps

auth_handler = Blueprint("auth_handler", __name__)


def token_getter():
    try:
        auth_header = request.cookies.get("Authentication token")
        if auth_header:
            auth_token = auth_header
            blacklist_check = BlacklistToken.query.filter_by(
                token=str(auth_token)
                ).first()
            if blacklist_check:
                responseObject = {
                    "status": "failure",
                    "message": "Invalid authentication token, please logout."
                }
                resp = make_response(jsonify(responseObject))
                return resp, 401
            auth_token = User.decode_auth_token(auth_token)
            return auth_token
        else:
            raise Exception
    except:
        responseObject = {
            "status": "fail",
            "message": "User is not logged in."
        }
    return make_response(jsonify(responseObject)), 401


# Wrapper that obtains and verifies an auth token in a cookie. Returns true if valid, false otherwise.
def login_cookie_getter(f):
    @wraps(f)
    def decorated_function(*args, **kwargs):
        auth_token = token_getter()
        try:
            g.user = User.query.filter_by(id=auth_token).first()
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
                auth_token = user.encode_auth_token(user.id)
                blacklist_check = BlacklistToken.query.filter_by(
                    token=str(auth_token)
                ).first()
                if blacklist_check:
                    responseObject = {
                        "status": "failure",
                        "message": "Some error occurred. Please try again."
                    }
                    resp = make_response(jsonify(responseObject))
                    return resp, 401
                else:
                    g.user = user
                    responseObject = {
                        "status": "success",
                        "message": "Successfully registered."
                    }
                    resp = make_response(jsonify(responseObject))
                    resp.set_cookie("Authentication token",
                                    auth_token, httponly=True)
                    return resp, 201
            except Exception:
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
                    try:
                        blacklist_check = BlacklistToken.query.filter_by(
                            token=str(auth_token)
                        ).first()
                    except Exception:
                        return "Error"
                    if blacklist_check:
                        responseObject = {
                            "status": "failure",
                            "message": "Some error occurred. Please try again."
                        }
                        resp = make_response(jsonify(responseObject))
                        return resp, 401
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
        except Exception:
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


class LogoutAPI(MethodView):
    def get(self):
        try:
            auth_token = request.cookies.get("Authentication token")
            responseObject = {
                "status": "success",
                "message": "Logout successful"
            }
            resp = make_response(jsonify(responseObject))
            resp.delete_cookie("Authentication token")
            token = BlacklistToken(
                    token=auth_token
                )
            db.session.add(token)
            db.session.commit()
            return resp, 200
        except:
            responseObject = {
                "status": "failure",
                "message": "Already logged out!"
            }
            resp = make_response(jsonify(responseObject))
            resp.delete_cookie("Authentication token")
            return resp, 401


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
logout_view = LogoutAPI.as_view("logout_api")

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
auth_handler.add_url_rule(
    "/auth/logout",
    view_func=logout_view,
    methods=["GET"]
)