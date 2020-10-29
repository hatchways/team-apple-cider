from database import db


class Product(db.Model):

    __tablename__ = 'product'

    id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    name = db.Column(db.String, unique=True, nullable=False)
    old_price = db.Column(db.Integer)
    price = db.Column(db.Integer)
    url = db.Column(db.String, nullable=False)
    img_url = db.Column(db.String, nullable=False)

    def __init__(self, name, old_price, price, url, img_url):
        self.name = name
        self.old_price = old_price
        self.price = price
        self.url = url
        self.img_url = img_url

    @property
    def serialize(self):
        """Return object data in easily serializable format"""
        return {
            "id": self.id,
            "name": self.name,
            "old_price": self.old_price,
            "price": self.price,
            "url": self.url,
            "img_url": self.img_url
        }
