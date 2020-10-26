from celery import Celery

app = Celery('celery_app', backend='rpc://', broker='amqp://guest@localhost//', include=['tasks'])

if __name__ == '__main__':
    app.start()