#!/bin/bash
# Run as user "postgres"
cat prices.sql | psql dealsmate_db
