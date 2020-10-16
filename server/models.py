from app import db


class List(db.Model):

    __tablename__ = 'list'

    id = db.Column(db.Integer, primary_key=True)
    product_type = db.Column(db.String, unique=True, nullable=False)
    # have an image type aswell, will implement later...

    def __init__(self, product_type):
        self.product_type = product_type


class Product(db.Model):

    __tablename__ = 'product'

    id = db.Column(db.Integer, primary_key=True)
    list_id = db.Column(db.Integer, db.ForeignKey('list.id'), nullable=False)
    name = db.Column(db.String, unique=True, nullable=False)
    description = db.Column(db.Text, nullable=False)
    price = db.Column(db.Float, nullable=False)
    url = db.Column(db.String, nullable=False)

    def __init__(self, list_id, name, description, price, url):
        self.list_id = list_id
        self.name = name
        self.description = description
        self.price = price
        self.url = url


if __name__ == "__main__":
    # if you run models.py you will create an example list and product
    list1 = List('Example')
    product1 = Product(1, 'this is an example product',
                       'product1', 'www.google.com', 99.99)
    db.create_all()
    db.session.add(list1)
    db.session.add(product1)
    try:
        db.session.commit()
        print("Successfully create list and product table in the dealsmate_db")
    except:
        print("An example list and product table already exists in the dealsmate_db")
