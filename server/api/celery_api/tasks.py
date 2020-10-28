from celery import Celery, signature
from celery.schedules import crontab

app = Celery('celery_app', backend='rpc://', broker='amqp://guest@localhost//')
app.conf.timezone = ('US/Eastern')

@app.task # Asynchronous functions are called tasks in Celery. Here is a simple task.
def add(x, y):
    return x + y

@app.task
def test(text):
    print(text)

# This will create a scheduled task that prints "hello" every 10 seconds. You can run this yourself by entering the pipenv shell as in the README, navigating to
# the celery_api folder, and running:
# celery -A tasks worker --loglevel=INFO
# in one terminal, and in another terminal running:
# celery -A tasks beat
# You should make sure to run the worker first, so you start seeing the scheduled task as soon as it starts.
# Make sure to use Ctrl+C to stop celery beat in order to free up resources on your computer.
@app.on_after_configure.connect
def scheduled_tasks(sender, **kwargs):
    sender.add_periodic_task(10.0, test.s("hello"))

# This task (still under the scheduled_tasks function which is decorated by app.on_after_configure.connect)
# ...
    sender.add_periodic_task(
        crontab(hour=12, minute=0, day_of_week=2),
        test.s("It's noon on Tuesday!")
    )