from celery import Celery
from celery.schedules import crontab

app = Celery('celery_app', backend='rpc://', broker='amqp://guest@localhost//')
app.conf.timezone = ('US/Eastern')

@app.task # Asynchronous functions are called tasks in Celery. Here is a simple task.
def add(x, y):
    return x + y

@app.on_after_configure.connect
def scheduled_task(sender, **kwargs):
    pass
