from database import db
import datetime

from .product import Product
from sqlalchemy.orm import relationship
from sqlalchemy import ForeignKey 

class Price(db.Model):

    __tablename__ = 'prices'

    product = relationship('Product')

    primary_id = db.Column(db.Integer, primary_key=True, unique=True, autoincrement=True)
    product_id = db.Column(ForeignKey('products.id'), nullable=False) 
    price = db.Column(db.Integer)    
    currency = db.Column(db.String)
    scrape_date = db.Column(db.DateTime, nullable=False)

    def __init__(self, product_id, price, currency):
        self.product_id = product_id
        self.price = price
        self.currency = currency
        self.scrape_date = datetime.datetime.now(tz=datetime.timezone.utc)

    @property
    def serialize(self):
        """Return object data in easily serializable format"""
        return {
            "product_id": self.product_id,
            "price": self.price,
            "currency": self.currency,
            "scrape_date": self.scrape_date,
        }
