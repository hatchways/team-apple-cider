from celery import Celery

app = Celery('hello', backend='rpc://', broker='amqp://guest@localhost//')

@app.task
def hello():
    return 'hello world'