from database import db


class Product(db.Model):

    __tablename__ = 'list_to_product'

    list_id = db.Column(db.Integer, nullable=False)
    product_id = db.Column(db.Integer, nullable=False)

    def __init__(self, list_id, product_id):
        self.list_id = list_id
        self.product_id = product_id
