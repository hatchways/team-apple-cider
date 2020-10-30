from database import db
from config import DevelopmentConfig
import datetime

class BlacklistToken(db.Model):

    __tablename__ = "blacklist_tokens"

    id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    token = db.Column(db.String(500), unique=True, nullable=False)
    blacklist_time = db.Column(db.DateTime, nullable=False)

    def __init__(self, token):
        self.token = token
        self.blacklist_time = datetime.datetime.now(tz=datetime.timezone.utc)

    def __repr__(self):
        return f"<id: token: {self.token}"
