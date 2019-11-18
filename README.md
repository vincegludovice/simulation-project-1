# Simulation Project 1 

## Getting Started 

This project is using json-server to watch the json file, with a custom middleware for auth and tokenizing. 

** Prerequisites **

nodejs required and system should be installed on the machine.

** Installing **
When nodejs is available, install json-server.

```
npm install -g json-server 
``` 

Afterwards, npm install will handle everything.
```
npm install
```
It will install dotenv, jsonwebtoken

** Deployment **
Use nodemon backend/.bin/dev or 
```
npm run json:server-auth
```
to use the json server with middleware. 

To simply watch the db.json, use 
```
json-server --watch backend/json/db.json
```
or 
```
npm run json:server
```
