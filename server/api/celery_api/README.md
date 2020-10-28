<h1>Celery and RabbitMQ Setup</h1>



Celery Documentation: https://docs.celeryproject.org/en/stable/index.html

<h2>Get Celery/RabbitMQ up and running:</h2>

Step 1:
Run pipenv install to ensure that you have the packages installed in your virtual environment.

Step 2:
Go to https://www.rabbitmq.com/download.html and follow the instructions provided for your device.

Step 3:
To test if everything is set up properly, run the following commands (for Windows):

<code>cd server  
pipenv shell  
cd api\async  
celery -A hello worker --loglevel=INFO</code>

Now, in a separate command prompt, run the following commands (for Windows):

<code>
cd server  

pipenv shell  
cd api\async  
python  
from hello import hello  
result = hello.delay()  
result.get(timeout=1)  
</code>

If 'hello world' is returned, congratulations, everything is set up properly! If you have an error, let me (Austin) know and I can try to help you solve the issue. For more detail on Celery, go to tasks.py in the celery_api folder in the api folder, and you can see more about Celery and run a few more advanced tasks.