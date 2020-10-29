from database import db
import datetime

from .product import Product
from sqlalchemy.orm import relationship

class Price(db.Model):

    __tablename__ = 'prices'

    primary_id = db.Column(db.Integer, primary_key=True, unique=True, autoincrement=True)
    url_id = db.Column(db.String, nullable=False)
    price = db.Column(db.Integer)    
    scrape_date = db.Column(db.DateTime, nullable=False)

    def __init__(self, url_id, price):
        self.price = price
        self.url_id = url_id
        self.scrape_date = datetime.datetime.now(tz=datetime.timezone.utc)

    @property
    def serialize(self):
        """Return object data in easily serializable format"""
        return {
            "price": self.price,
            "url_id": self.url_id,
            "scrape_date": self.scrape_date,
        }
