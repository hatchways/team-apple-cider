from database import db


class Product(db.Model):

    __tablename__ = 'product'

    id = db.Column(db.String, primary_key=True)
    name = db.Column(db.String, nullable=False)
    currency = db.Column(db.String, nullable=False)
    old_price = db.Column(db.Integer)
    price = db.Column(db.Integer)
    availability = db.Column(db.Boolean, nullable=False)
    url = db.Column(db.String, nullable=False)
    img_url = db.Column(db.String, nullable=False)

    def __init__(self, id, name, currency, old_price, price, availability, url, img_url):
        self.id = id
        self.name = name
        self.currency = currency
        self.old_price = old_price
        self.price = price
        self.availability = availability
        self.url = url
        self.img_url = img_url

    @property
    def serialize(self):
        """Return object data in easily serializable format"""
        return {
            "id": self.id,
            "name": self.name,
            "currency": self.currency,
            "old_price": self.old_price,
            "price": self.price,
            "availability": self.availability,
            "url": self.url,
            "img_url": self.img_url
        }
