# flask-starter

## Starting the server:

1. Open a terminal and go to the server folder. Make sure you have **pipenv** installed (`pip install pipenv`)

2. Install the dependencies with `pipenv install`. This will also create a virtual environment, if there isn't one already

3. Activate the virtual environment and start the app with `pipenv run flask run`

## Setting up PostgreSQL

1. Follow the instructions to [install](https://www.postgresqltutorial.com/install-postgresql/) Postgresql (v12) on your local machine

2. Install all dependencies with `pipenv install`

3. (MacOS and Windows only) To run the psql shell from anywhere in our command line, we need to set up our \$PATH [environment variable](https://superuser.com/questions/284342/what-are-path-and-other-environment-variables-and-how-can-i-set-or-use-them) to point towards the location of our psql shell executable.

   - Windows: [follow these instructions](https://sqlbackupandftp.com/blog/setting-windows-path-for-postgres-tools)
   - [MacOS](https://www.cyberciti.biz/faq/appleosx-bash-unix-change-set-path-environment-variable/): `export PATH=/Library/PostgreSQL/12/bin:$PATH`
   - Linux: _Most Linux platforms such as Debian, Red Hat / CentOS, SUSE, and Ubuntu have PostgreSQL integrated with their package management._

4. To create a local database, we can either use the GUI (eg pgAdmin or [dbeavear](https://dbeaver.io/download/)) or through the psql shell via terminal. The following is an example of how to run it through your terminal.

   a) Access the psql shell and type in your password

   - Windows: `psql -U postgres`
   - MacOS: `sudo psql postgres`
   - Linux: `sudo -i -u postgres` then `psql`

   b) Create a database while in the shell

   - `postgres=# CREATE DATABASE dealsmate_db;`
   - `postgres=# \l`: to view all available databases`
   - `postgres=# \q`: to exit the shell`
   - other psql shell [commands](https://www.postgresqltutorial.com/psql-commands/)

5. If you made any changes (eg. passwords, urls, dbNames). Update the following vars in your .env file so in the future you will be able to connect the flask app to your local psql.
   - `POSTGRES_USER = "postgres"`
   - `POSTGRES_PW = "password"`
   - `POSTGRES_URL = "127.0.0.1:5432"`
   - `POSTGRES_DB = "dealsmate_db"`

## API Usage

### Scraper

The scraper can retrieve information about an Amazon product by providing a valid product link.

The following cURL POST request will scrape an Amazon headset listing:

`curl -X POST http://localhost:5000/scrape --data '{"url": "https://www.amazon.com/dp/B00YXO5UKY"}' --header "Content-Type: application/json" | jq`

The information is returned as a JSON object:

```
{
  "availability": true,
  "img_url": "https://images-na.ssl-images-amazon.com/images/I/81dh8R950eL._SX342_.jpg",
  "old_price": "$29.95",
  "price": "$24.95",
  "url": "https://www.amazon.com/dp/B00YXO5UKY",
  "name": "Turtle Beach Recon 50P Gaming Headset for PlayStation 5, PS4 Pro & PS4"
}
```

### Prices

A price history is kept for each product on the database. The API routes for the pricing are as follows:

#### _GET entire price history all products in database:_

`curl localhost:5000/prices`

#### _GET entire price history of a single product:_

`curl localhost:5000/prices/product/<url_id>`

#### _POST new price to price history of a single product:_

`curl -X POST localhost:5000/prices/product/<url_id> --data "{\"price\": ####, \"currency\": $/£/€ }" --header "Content-Type: application/json"`

#### _DELETE entire price history of a single product:_

`curl -X DELETE localhost:5000/prices/product/<url_id>`

## External API Services

### Cloudinary

On Cloudinary these were the presets that were used to get proper image transformations for the products and profiles.

| PRODUCT_IMG_PRESET | PROFILE_IMG_PRESET        |
| ------------------ | ------------------------- |
| max_width: 400px   | max_width: 400px          |
| max_height:400px   | max_height:400px          |
| crop_type:fitted   | crop_type: fitted         |
|                    | face_detection_crop: true |
|                    | background_removal: true  |
