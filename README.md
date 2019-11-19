# Simulation Project 1 

## Getting Started 

This project is using json-server to watch the json file, with a custom middleware for auth and tokenizing. 

**Prerequisites**  

nodejs should be installed on the machine.

**Setup**   
- `fork` and `clone` this repository.
- `cd` into the project.
-  Run `npm install -g json-server` (**optional**) 
-  Run `npm install` and
    It will install: 
     - json-server - is for creating a mock rest json server that utilize JSON data to work on.  
     - dotenv - is a zero-dependency module that loads environment variables from a .env file into process.env.
     - jsonwebtoken - is a mechanism to verify the owner of some JSON data. It’s an encoded string, which is URL safe, that                        can contain an unlimited amount of data and and it’s cryptographically signed.
-  Create .env file to the root folder.
    .env file should include: 
     -  SECRET_KEY - is for the token creation using jsonwebtoken.create()
     -  PORT - is for the web server what port to listen on.
    
<details>
    
<summary> <code> ./.env </code> </summary>

```js
  SECRET_KEY=aaabbcce33
  PORT=3001
```

</details>   
   

**Deployment**  
-  Run `npm run json:server-auth` to use the json server with middleware.
     - You can also run `nodemon backend/.bin/dev`, if `nodemon` was already installed. 
-  To watch the db.json, Run `json-server --watch backend/json/db.json` or `npm run json:server`