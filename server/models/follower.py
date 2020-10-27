from database import db

class Follower(db.Model):

    __tablename__ = 'follower'

    user_id = db.Column(db.String,nullable=False)
    follower_id = db.Column(db.String,nullable=False)


    def __init__(self, user_id, follower_id):
        self.user_id = user_id
        self.follower_id = follower_id
