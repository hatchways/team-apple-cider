from database import db
import datetime

class Price(db.Model):

    __tablename__ = 'prices'

    primary_id = db.Column(db.Integer, primary_key=True, unique=True, autoincrement=True)
    product_id = db.Column(db.Integer, nullable=False)
    price = db.Column(db.Integer, nullable=False)
    scrape_date = db.Column(db.DateTime, nullable=False)

    def __init__(self, product_id, price):
        self.product_id = product_id
        self.price = price
        self.scrape_date = datetime.datetime.now(tz=datetime.timezone.utc)
