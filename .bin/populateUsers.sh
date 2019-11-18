#!/usr/bin/env zsh

./node_modules/.bin/json-server db.json -m ./node_modules/json-server-auth &

SERVER_PID=$!

sleep 2

for n in {1..50}; do
  .bin/createUser.js
  sleep 0.25
done

kill "$SERVER_PID"

echo "database seeded"
