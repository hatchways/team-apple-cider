import os

basedir = os.path.abspath(os.path.dirname(__file__))

class Config:
    TEAM_NAME = os.environ['APPLE_CIDER']
    
    # Database
    DATABASE_URL = "postgresql:///dealsmates_db" 
    SQLALCHEMY_DATABASE_URI = DATABASE_URL
    SQLALCHEMY_TRACK_MODIFICATIONS = False


