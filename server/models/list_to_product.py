from database import db


class ListToProduct(db.Model):

    __tablename__ = 'list_to_product'
    id = db.Column(db.Integer, primary_key=True,autoincrement=True)
    list_id = db.Column(db.Integer,  nullable=False)
    product_id = db.Column(db.Integer, nullable=False)

    def __init__(self, list_id, product_id):
        self.list_id = list_id
        self.product_id = product_id
    
    
    @property
    def serialize(self):
        """Return object data in easily serializable format"""
        return {
            "id": self.id,
            "list_id": self.list_id,
            "product_id":self.product_id

        }


