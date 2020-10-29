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

# This will create a scheduled task that prints "hello" every 10 seconds. You can run this yourself by 
# entering the pipenv shell as in the README, navigating to the celery_api folder, and running:
# celery -A tasks worker --loglevel=INFO
# in one terminal, and in another terminal running:
# celery -A tasks beat
# You should make sure to run the worker first, so you start seeing the scheduled task as soon as it starts.
# Make sure to use Ctrl+C to stop celery beat in order to free up resources on your computer.
@app.on_after_configure.connect
def scheduled_tasks(sender, **kwargs):
    sender.add_periodic_task(10.0, test.s("hello"))

# This task (still under the scheduled_tasks function which is decorated by app.on_after_configure.connect)
# uses the crontab API in Celery in order to schedule a periodic task. This task will take place every Thursday at 9:25 AM.
# You can alter the hour, minute, and day_of_week to test it yourself (note that you will have to use Ctrl+C and rerun
# celery -A tasks beat if you want to alter this code).
    sender.add_periodic_task(
        crontab(hour=9, minute=25, day_of_week=4),
        test.s("It's 9:25 AM on Thursday!")
    )

# This task will run every hour on the hour. This is probably the type of periodic task most suitable to our
# use case. Celery's schedule is very customizable, it should be able to schedule using virtually whatever periodic
# timing we could want (fun fact: we could even run tasks based on sunrise/sunset in any location around the world).
    sender.add_periodic_task(
        crontab(minute=0, hour='*/1'),
        test.s("This runs every hour on the hour.")
    )

# Unscheduling a task here involves manually removing the task from scheduled_tasks.