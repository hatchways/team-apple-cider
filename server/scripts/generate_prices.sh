#!/bin/bash


for i in {1..10}
do
    id=$(( ( RANDOM % 5 )  + 1 ))
    price=$(( RANDOM ))
    curl -X POST "localhost:5000/prices/product/${id}" --data "{\"price\": ${price}}"  --header "Content-Type: application/json"
done
