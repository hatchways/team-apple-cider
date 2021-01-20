import os
from dotenv import load_dotenv

# load all the environment variables in the .env file
load_dotenv(override=True)

POSTGRES_USER = os.environ['POSTGRES_USER']
POSTGRES_PW = os.environ['POSTGRES_PW']
POSTGRES_URL = os.environ['DATABASE_URL']
POSTGRES_DB = os.environ['POSTGRES_DB']
TEAM_NAME = os.environ['TEAM_NAME']

CLOUDINARY_NAME = os.environ["CLOUDINARY_NAME"]
PRODUCT_IMG_PRESET = os.environ["PRODUCT_IMG_PRESET"]
PROFILE_IMG_PRESET = os.environ["PROFILE_IMG_PRESET"]


class BaseConfig:
    SECRET_KEY = os.getenv("SECRET_KEY", "example_backup_secret_key")
    DEBUG = False
    BCRYPT_LOG_ROUNDS = 13
    SQLALCHEMY_TRACK_MODIFICATIONS = False


class DevelopmentConfig(BaseConfig):
    # Create connection between python and psql db
    # DB_URL = 'postgresql+psycopg2://{user}:{pw}@{url}/{db}'.format(
    #     user=POSTGRES_USER, pw=POSTGRES_PW, url=POSTGRES_URL, db=POSTGRES_DB)
    SQLALCHEMY_DATABASE_URI = 'postgres://misqicsajloddv:d805debd0e5f42273e9fd1b35ab75b375a2bf25072e86e49cb77533a43889a98@ec2-54-237-135-248.compute-1.amazonaws.com:5432/dfaekkb867fmfr'
    SQLALCHEMY_TRACK_MODIFICATIONS = False
    DEBUG = True
    BCRYPT_LOG_ROUNDS = 4
