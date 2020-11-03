from celery import Celery, signature
from celery.schedules import crontab

app = Celery('celery_app', backend='rpc://', broker='amqp://guest@localhost//')
app.conf.timezone = ('US/Eastern')

@app.task
def test(text):
    print(text)

@app.on_after_configure.connect
def scheduled_tasks(sender, **kwargs):

    sender.add_periodic_task(
        crontab(minute="*/1"),
        test.s(message)
    )
