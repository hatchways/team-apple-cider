from database import db



class List(db.Model):

    __tablename__ = 'list'

    id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'),nullable=False)
    name = db.Column(db.String, nullable=False)
    img_url = db.Column(db.String, nullable=False)
    private = db.Column(db.Boolean, nullable=False)

    def __init__(self, user_id, name, img_url, private=False):
        self.user_id = user_id
        self.name = name
        self.img_url = img_url
        self.private = private

    @property
    def serialize(self):
        """Return object data in easily serializable format"""
        return {
        "id" : self.id, 
        "user_id" : self.user_id, 
        "name": self.name, 
        "img_url": self.img_url,
        "product_count" : self.product_count,
        "private":self.private
        }
