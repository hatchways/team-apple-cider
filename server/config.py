import os
from dotenv import load_dotenv

load_dotenv() #load all the environment variables in the .env file

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
    DEBUG = True
    BCRYPT_LOG_ROUNDS = 4
    SQLALCHEMY_DATABASE_URI = POSTGRES_LOCAL_BASE + POSTGRES_DB
