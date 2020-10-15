from server import db, flask_bcrypt, app
import datetime
import jwt


class User(db.Model):
    __tablename__ = "users"

    id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    email = db.Column(db.String(255), unique=True, nullable=False)
    password = db.Column(db.String(255), nullable=False)
    registered_time = db.Column(db.DateTime, nullable=False)

    def __init__(self, email, password):
        self.email = email
        self.password = flask_bcrypt.generate_password_hash(password, app.config.get("BCRYPT_LOG_ROUNDS")).decode()
        self.registered_time = datetime.datetime.now(tz=datetime.timezone.utc)

    def encode_auth_token(self, user_id):
        try:
            payload = {
                "exp": datetime.datetime.now(tz=datetime.timezone.utc) + datetime.timedelta(days=120),
                "iat": datetime.datetime.now(tz=datetime.timezone.utc),
                "sub": user_id
            }
            return jwt.encode(
                payload,
                app.config.get("SECRET_KEY"),
                algorithm="HS256"
            )
        except Exception as e:
            return e

    @staticmethod
    def decode_auth_token(auth_token):
        try:
            payload = jwt.decode(auth_token, app.config.get("SECRET_KEY"))
            return payload["sub"]
        except jwt.ExpiredSignatureError:
            return "Signature expired. Please log in again."
        except jwt.InvalidTokenError:
            return "Invalid token. Please log in again."
