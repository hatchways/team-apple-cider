# flask-starter

## Starting the server:


1. Open a terminal and go to the server folder. Make sure you have **pipenv** installed (`pip install pipenv`)
2. Install the dependencies with `pipenv install`. This also createa a virtual environment, if there isn't one already
3. Activate the virtual environment and start the app with `pipenv run flask run`


## How to setup PostgresSQL Database

1. Install PostgresSQL
- https://www.postgresqltutorial.com/install-postgresql/

2. https://hackersandslackers.com/configure-flask-applications/
https://realpython.com/flask-by-example-part-2-postgres-sqlalchemy-and-alembic/


3. pipenv install psycopg2 Flask-SQLAlchemy Flask-Migrate

4. Create a database: psql -U postgres, then type your password you get for your server

5. Create database using: CREATE DATBASE dealsmate_db, then do \l to see all your databases

6. \dt to see all the tables

7. you can export to set and environment variable but I decided to just create a local variable in my config file called DATABASE_URL


## Todo List
- Create a models.py to init a db
- Test CRUD features using dummy data 
- Revise README so others know how to setup their psql db
- Test CRUD using real product data issue #7
