# flask-starter

  

## Starting the server:

  
  

1. Open a terminal and go to the server folder. Make sure you have **pipenv** installed (`pip install pipenv`)

2. Install the dependencies with `pipenv install`. This also createa a virtual environment, if there isn't one already

3. Activate the virtual environment and start the app with `pipenv run flask run`

  

## Setting up PostgreSQL
 

1. Follow the instructions to install Postgresql (v12.4) on your local machine https://www.postgresqltutorial.com/install-postgresql/ 

2. Install all psql flask dependencies in your venv `pipenv install`
	-   Psycopg2 ([2.8.6](https://pypi.python.org/pypi/psycopg2/2.8.6)) : a Python adapter for Postgres
	-   Flask-SQLAlchemy ([2.4.4](https://flask-sqlalchemy.palletsprojects.com/en/2.x/)) : Flask extension that provides  [SQLAlchemy](https://www.sqlalchemy.org/)  support
	-   Flask-Migrate ([2.5.3](https://pypi.python.org/pypi/Flask-Migrate/2.5.2)) : extension that supports SQLAlchemy database migrations via  [Alembic](https://pypi.python.org/pypi/alembic/2.5.3)
	- Python-dotenv ([0.14.0](https://pypi.org/project/python-dotenv/)):Reads from `.env` file and adds them to environment variables.
	
3.  Add `C:\Program Files\PostgreSQL\12\bin` and `C:\Program Files\PostgreSQL\12\lib` to your PATH, so you can run the psql shell from your terminal.

4.  To create a local database, we need to access the psql shell. Run the following in your terminal: 
![setup psql](https://drive.google.com/uc?export=view&id=1Xlf6S5nODTuWjCp7xIyW3XrIXwcJt7MZ)

5. Now that you have created a database, make sure to update your .env file so in the future we will be able to connect the flask app to our local psql database.

Common psql shell commands: https://www.postgresqltutorial.com/psql-commands/


