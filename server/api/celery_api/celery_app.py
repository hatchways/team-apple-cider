from celery import Celery

app = Celery('celery_app', backend='rpc://', broker='amqp://guest@localhost//', include=['tasks'])

print("hello")