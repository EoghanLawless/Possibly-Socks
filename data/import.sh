#!/bin/bash
mongoimport --host localhost:27017 --db $1 --collection $2 --type csv --headerline --file $2.csv
