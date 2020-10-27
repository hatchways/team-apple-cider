from database import db

class ListToProduct(db.Model):

    __tablename__ = 'list_to_product'

    list_id = db.Column(db.Integer, db.ForeignKey('list.id'))
    product_id = db.Column(db.Integer,db.ForeignKey('product.id'))

    def __init__(self, list_id,product_id):
        self.list_id = list_id
        self.product_id = product_id
