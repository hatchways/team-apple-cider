from database import db
from sqlalchemy import ForeignKey
from sqlalchemy.orm import relationship
import datetime
from models.user import User
from models.price import Price



class Notification(db.Model):

    __tablename__ = 'notifications'

    prices = relationship('prices')
    users = relationship('users')

    id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    user_id = db.Column(ForeignKey('users.id'), nullable=False)
    price_id = db.Column(ForeignKey('prices.price'), nullable=False) 
    status = db.Column(db.String(15), nullable=False) # Status can be "seen", "unseen", or "dismissed".
    notification_time = db.Column(db.DateTime, nullable=False)

    def __init__(self, user_id, price_id, status):
        self.user_id = user_id
        self.price_id = price_id
        self.status = status
        self.notification_time = datetime.datetime.now(tz=datetime.timezone.utc)

    @property
    def serialize(self):
        """Return object data in easily serializable format"""
        return {
            "id" : self.id, 
            "user_id" : self.user_id, 
            "price_id": self.price_id, 
            "status": self.status,
            "notification_time":self.notification_time
        }
