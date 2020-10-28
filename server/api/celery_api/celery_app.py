from celery import Celery
from api.celery_api import tasks

app = Celery('celery_app', backend='rpc://', broker='amqp://guest@localhost//', include=['tasks'])

print("hello")