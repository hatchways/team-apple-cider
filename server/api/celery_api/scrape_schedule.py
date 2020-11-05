from celery import Celery, signature
from celery.schedules import crontab
from api.scraper import ScrapeAmazon
import requests


app = Celery('scrape_schedule', backend='rpc://', broker='amqp://guest@localhost//')
app.conf.timezone = ('US/Eastern')

@app.task
def scrape_url():

    # Get product url
    product_req = requests.get('http://localhost:5000/products')
    product_json = product_req.json()
    URL = product_json[0]['url']
    print(URL)

    # Scrape item
    item = ScrapeAmazon(URL)
    return 'Scraped "{}", price currently at: {}'.format(item.name, item.price)

@app.on_after_configure.connect
def scheduled_tasks(sender, **kwargs):
    app.conf.beat_schedule = {
            "task_name": {
                "task": "api.celery_api.scrape_schedule.scrape_url",
                "schedule": 25.0,
                # "args": ()
            }, 
        }
