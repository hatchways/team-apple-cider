from celery import Celery, signature
from celery.schedules import crontab
from flask import jsonify, Blueprint, request

scheduled_tasks = Blueprint("scheduled_tasks", __name__)

app = Celery('celery_app', backend='rpc://', broker='amqp://guest@localhost//')
app.conf.timezone = ('US/Eastern')

@app.task
def test(text):
    print(text)

@scheduled_tasks.route("/tasks", methods=["POST"])
@app.on_after_configure.connect
def tasks(sender=app, **kwargs):
    if request.method == "POST":
        post_data = request.get_json()
        message = post_data.get("message")
        task_name = post_data.get("task_name")
        app.conf.beat_schedule = {
            task_name: {
                "task": "scheduled_tasks.test",
                "schedule": 5.0,
                "args": (message,)
            },
        }
        return "success"

scheduled_tasks.add_url_rule(
    "/tasks",
    view_func=tasks,
    methods=["POST"]
)