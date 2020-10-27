from database import db
import datetime

class Price(db.Model):

    __tablename__ = 'prices'

    id = db.Column(db.Integer, primary_key=True, unique=True, autoincrement=True)
    url_id = db.Column(db.String, nullable=False)
    price = db.Column(db.Integer, nullable=False)
    scrape_date = db.Column(db.DateTime, nullable=False)

    def __init__(self, url_id, price):
        self.url_id = url_id
        self.price = price
        self.scrape_date = datetime.datetime.now(tz=datetime.timezone.utc)
