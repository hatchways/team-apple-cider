from database import db


class Product(db.Model):

    __tablename__ = 'product'

    id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    list_id = db.Column(db.Integer, db.ForeignKey('list.id'), nullable=False)
    name = db.Column(db.String, unique=True, nullable=False)
    old_price = db.Column(db.Float, nullable=False)
    price = db.Column(db.Float, nullable=False)
    url = db.Column(db.String, nullable=False)
    img_url = db.Column(db.String, nullable=False)

    def __init__(self, list_id, name, price, old_price, url, img_url):
        self.list_id = list_id
        self.name = name
        self.old_price = old_price
        self.price = price
        self.url = url
        self.img_url = img_url
