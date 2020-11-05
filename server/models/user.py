from server import flask_bcrypt
from database import db
from flask_login import UserMixin
from config import DevelopmentConfig
import datetime
import jwt

followers = db.Table('followers',
                     db.Column('follower_id', db.Integer,
                               db.ForeignKey('users.id')),
                     db.Column('followed_id', db.Integer,
                               db.ForeignKey('users.id'))
                     )


class User(UserMixin, db.Model):
    __tablename__ = "users"

    id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    email = db.Column(db.String(255), unique=True, nullable=False)
    name = db.Column(db.String(255), nullable=False)
    password = db.Column(db.String(255), nullable=False)
    registered_time = db.Column(db.DateTime, nullable=False)
    followed = db.relationship('User', secondary=followers,
                               primaryjoin=(followers.c.follower_id == id),
                               secondaryjoin=(followers.c.followed_id == id),
                               backref=db.backref('followers', lazy='dynamic'), lazy='dynamic')

    def __init__(self, email, name, password):
        self.email = email
        self.name = name
        self.password = flask_bcrypt.generate_password_hash(
            password, DevelopmentConfig.BCRYPT_LOG_ROUNDS).decode()
        self.registered_time = datetime.datetime.now(tz=datetime.timezone.utc)

    def follow(self, user):
        if not self.is_following(user):
            self.followed.append(user)

    def unfollow(self, user):
        if self.is_following(user):
            self.followed.remove(user)

    def is_following(self, user):

        return self.followed.filter(
            followers.c.followed_id == user.id).count() > 0

    def encode_auth_token(self, user_id):
        try:
            payload = {
                "exp": datetime.datetime.now(tz=datetime.timezone.utc) + datetime.timedelta(days=120),
                "iat": datetime.datetime.now(tz=datetime.timezone.utc),
                "sub": user_id
            }
            return jwt.encode(
                payload,
                DevelopmentConfig.SECRET_KEY,
                algorithm="HS256"
            )
        except Exception as e:
            return e

    @staticmethod
    def decode_auth_token(auth_token):
        try:
            payload = jwt.decode(auth_token, DevelopmentConfig.SECRET_KEY)
            return payload["sub"]
        except jwt.ExpiredSignatureError:
            return "Signature expired. Please log in again."
        except jwt.InvalidTokenError:
            return "Invalid token. Please log in again."

    @property
    def serialize(self):
        """Return object data in easily serializable format"""
        return {
            "id": self.id,
            "email": self.email,
            "name": self.name,
            "password": self.password,
            "registered_time": self.registered_time
        }
