import os
from dotenv import load_dotenv

load_dotenv() #load all the environment variables in the .env file

TEAM_NAME = os.environ['TEAM_NAME']
POSTGRES_USER = os.environ['POSTGRES_USER']
POSTGRES_PW = os.environ['POSTGRES_PW']
POSTGRES_URL = os.environ['POSTGRES_URL']
POSTGRES_DB = os.environ['POSTGRES_DB']
