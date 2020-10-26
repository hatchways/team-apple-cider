from database import db
import datetime

class Prices(db.Model):

    __tablename__ = 'price_history'

    id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    url_id = db.Column(db.String, nullable=False)
    price = db.Column(db.Integer, nullable=False)
    date = db.Column(db.DateTime, nullable=False)

    def __init__(self, url_id, price):
        self.url_id = url_id
        self.price = price
        self.date = datetime.datetime.now(tz=datetime.timezone.utc)
