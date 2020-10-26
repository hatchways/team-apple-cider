from api.celery_api.celery_app import app

@app.task
def add(x, y):
    return x + y