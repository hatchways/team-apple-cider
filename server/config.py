import os
from dotenv import load_dotenv

# load all the environment variables in the .env file
load_dotenv(override=True)

TEAM_NAME = os.environ['TEAM_NAME']
POSTGRES_USER = os.environ['POSTGRES_USER']
POSTGRES_PW = os.environ['POSTGRES_PW']
POSTGRES_URL = os.environ['POSTGRES_URL']
POSTGRES_DB = os.environ['POSTGRES_DB']
POSTGRES_LOCAL_BASE = 'postgresql://postgres:password@localhost/'


class BaseConfig:
    SECRET_KEY = os.getenv("SECRET_KEY", "example_backup_secret_key")
    DEBUG = False
    BCRYPT_LOG_ROUNDS = 13
    SQLALCHEMY_TRACK_MODIFICATIONS = False


class DevelopmentConfig(BaseConfig):
    # Create connection between python and psql db
    DATABASE_URL = 'postgresql+psycopg2://{user}:{pw}@{url}/{db}'.format(
    user=POSTGRES_USER, pw=POSTGRES_PW, url=POSTGRES_URL, db=POSTGRES_DB)
    SQLALCHEMY_DATABASE_URI = DATABASE_URL
    SQLALCHEMY_TRACK_MODIFICATIONS = False
    DEBUG = True
    BCRYPT_LOG_ROUNDS = 4
