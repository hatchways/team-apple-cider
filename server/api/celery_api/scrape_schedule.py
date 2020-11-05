from celery import Celery, signature
from celery.schedules import crontab
from api.scraper import ScrapeAmazon
from datetime import datetime
import requests

app = Celery('scrape_schedule', backend='rpc://', broker='amqp://guest@localhost//')
app.conf.timezone = ('US/Eastern')


@app.task
def scrape_url():
    product_req = requests.get('http://localhost:5000/products')
    items = product_req.json()
    print('Scraping all products at {}'.format(datetime.now()))

    for item in items:
        URL = item['url']
        item = ScrapeAmazon(URL)
    
    return 'Scraped items: {}'.format([item['id'] for item in items])

@app.on_after_configure.connect
def scheduled_tasks(sender, **kwargs):
    app.conf.beat_schedule = {
            "task_name": {
                "task": "api.celery_api.scrape_schedule.scrape_url",
                "schedule": 60.0
            }, 
        }
