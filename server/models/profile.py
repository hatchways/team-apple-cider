from database import db

from .user import User
from sqlalchemy.orm import relationship
from sqlalchemy import ForeignKey 

class Profile(db.Model):

    __tablename__ = 'profile'

    users = relationship('User')

    id = db.Column(ForeignKey('users.id'), primary_key=True, nullable=False) 
    name = db.Column(db.String, nullable=False)
    photo = db.Column(db.String)

    def __init__(self, name, photo):
        self.name = name
        self.photo = photo

    @property
    def serialize(self):
        """Return object data in easily serializable format"""
        return {
            "name": self.name,
            "photo": self.photo,
        }
