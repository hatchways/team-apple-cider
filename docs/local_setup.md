## Local Setup

### Setting up PostgreSQL

1.  Follow the instructions to [install](https://www.postgresqltutorial.com/install-postgresql/) Postgresql (v12) on your local machine
2.  Install all dependencies with `pipenv install`
3.  (MacOS and Windows only) To run the psql shell from anywhere in our command line, we need to set up our \$PATH [environment variable](https://superuser.com/questions/284342/what-are-path-and-other-environment-variables-and-how-can-i-set-or-use-them) to point towards the location of our psql shell executable.
    -   Windows: [follow these instructions](https://sqlbackupandftp.com/blog/setting-windows-path-for-postgres-tools)
    -   [MacOS](https://www.cyberciti.biz/faq/appleosx-bash-unix-change-set-path-environment-variable/): `export PATH=/Library/PostgreSQL/12/bin:$PATH`
    -   Linux: _Most Linux platforms such as Debian, Red Hat / CentOS, SUSE, and Ubuntu have PostgreSQL integrated with their package management._
4.  To create a local database, we can either use the GUI (eg pgAdmin or [dbeavear](https://dbeaver.io/download/)) or through the psql shell via terminal. The following is an example of how to run it through your terminal.
    <ol type="a">
        <li> 
            Access the psql shell and type in your password
            <ul>
                <li>Windows: <code>psql -U postgres</code></li>
                <li>MacOS: <code>sudo psql postgres</code></li>
                <li>Linux: <code>sudo su postgres -c psql</code></li>
            </ul>
        </li>
        <li> 
            Create a database while in the shell
            <ol>
                <li><code>postgres=## CREATE DATABASE dealsmate_db;</code></li>
                <li><code>postgres=## \l</code> : to view all available databases</li>
                <li><code>postgres=## \q</code> : to exit the shell</li>
                <li><a href='https://www.postgresqltutorial.com/psql-commands/'>Other psql shell commands</a></li>
            </ol>
        </li>
    </ol>

5.  If you made any changes (eg. passwords, urls, dbNames). Update the following vars in your .env file so in the future you will be able to connect the flask app to your local psql.
    -   `POSTGRES_USER = "postgres"`
    -   `POSTGRES_PW = "password"`
    -   `POSTGRES_URL = "127.0.0.1:5432"`
    -   `POSTGRES_DB = "dealsmate_db"`

### Starting the server:

1. Open a terminal and go to the server folder. Make sure you have **pipenv** installed (`pip install pipenv`)
2. Install the dependencies with `pipenv install`. This will also create a virtual environment, if there isn't one already
3. Activate the virtual environment and start the app with `pipenv run flask run`

### Starting the frontend

1. Open a terminal and go to the client folder
2. Run `npm install` to install node dependencies
3. Run `npm start` to start the React App
