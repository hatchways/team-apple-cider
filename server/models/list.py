from database import db

class List(db.Model):

    __tablename__ = 'list'

    id = db.Column(db.Integer, primary_key=True,autoincrement=True)
    product_type = db.Column(db.String, unique=True, nullable=False)
    visible = db.Column(db.Boolean, nullable=False)
    # have an image type aswell, will implement later...

    def __init__(self, product_type, visible):
        self.product_type = product_type
        self.visible = visible
