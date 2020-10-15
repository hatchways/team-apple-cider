from app import db

class List(db.Model):

    __tablename__ = 'list'

    id = db.Column(db.Integer, primary_key=True)
    product_type = db.Column(db.String, nullable=False)

    def __init__(self, product_type):
        self.product_type = product_type

    def __repr__(self):
        return f"Id: {self.id} --- Product Type: {self.product_type}"


if __name__ == "__main__":
    list1 = List('Clothes')
    list2 = List('Furniture')
    list3 = List('Luxury')
    db.create_all()
    db.session.add(list1)
    db.session.add(list2)
    db.session.commit()


    # list4 = List('Technology')
    # db.session.add(list1,list2,list3)
    # db.session.commit()
    










# class Product(db.Model):

#     __tablename__ = 'Product'
#     lists = db.relationship(List)

#     id = db.Column(db.Integer, primary_key=True)
#     list_id = db.Column(db.Integer, db.ForeignKey('lists.id'), nullable=False)
#     date = db.Column(db.DateTime, nullable=False, default=datetime.utcnow)
#     title = db.Column(db.String(140), nullable=False)
#     text = db.Column(db.Text, nullable=False)

#     def __init__(self, title, text, user_id):
#         self.title = title
#         self.text = text
#         self.user_id =user_id


#     def __repr__(self):
#         return f"Post Id: {self.id} --- Date: {self.date} --- Title: {self.title}"



