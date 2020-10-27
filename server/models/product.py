from database import db


class Product(db.Model):

    __tablename__ = 'product'

    id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    name = db.Column(db.String, unique=True, nullable=False)
    old_price = db.Column(db.Float, nullable=False)
    price = db.Column(db.Float, nullable=False)
    url = db.Column(db.String, nullable=False)
    img_url = db.Column(db.String, nullable=False)
    price_update = db.Column(db.Boolean, nullable=False)

    def __init__(self, name, price, old_price, url, img_url, price_update=False):
        self.name = name
        self.old_price = old_price
        self.price = price
        self.url = url
        self.img_url = img_url
        self.price_update = price_update
