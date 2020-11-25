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

`curl localhost:5000/prices/product/<product_id>`

#### _POST new price to price history of a single product:_

`curl -X POST localhost:5000/prices/product/<product_id> --data '{"price": ####, "currency": $/£/€}' --header "Content-Type: application/json"`

#### _DELETE entire price history of a single product:_

`curl -X DELETE localhost:5000/prices/product/<product_id>`

### Profiles

#### _GET all profiles from database:_

`curl localhost:5000/profiles`

#### _GET single profile from database:_

`curl localhost:5000/profiles/<id>`

#### _POST update profile information:_

`curl -X PUT localhost:5000/profiles/1 --data '{"name": "Simon", "photo": "https://secure.gravatar.com/avatar/6f81c54461fc4b30b1b855050a071974"}' --header "Content-Type: application/json"`

### Lists

#### _GET one personal list (public or private) created by the user:_

`curl localhost:5000/lists?user_id=<USER_ID>&list_id=<LIST_ID>`

#### _GET all list of any one user (only authorized users can see private ones):_

`curl localhost:5000/lists?user_id=<USER_ID>`

#### _GET one list of any user (public lists only):_

`curl localhost:5000/lists?list_id=<LIST_ID>`

#### _POST(create) new list:_

`curl -X POST localhost:5000/lists --data '{ "name": "<NAME>", "img_url": "<IMAGE URL>" }' --header "Content-Type: application/json"`

### List to Products

#### _GET all existing product given an list_id (only authorized users can see ones from private lists):_

`curl localhost:5000/list-to-products/<LIST_ID>`

#### _POST(add) new product ids into an existing list (only authorized users can do this):_

`curl -X POST localhost:5000/list-to-products/<LIST_ID> --data '{ "product_id": <PRODUCT_ID> }'--header "Content-Type: application/json"`

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
