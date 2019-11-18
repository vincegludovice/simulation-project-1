const fs = require('fs')
const jsonServer = require('json-server')
const bodyParser = require('body-parser')

const controller = require('./module/controller')
const middleWare = require('./middleware')

const PORT = process.env.PORT || 3000

const server = jsonServer.create()
const router = jsonServer.router('./backend/json/db.json');



//this is neaded to use post, patch etc etc
server.use(bodyParser.json())
server.use(jsonServer.defaults()); //load default jsonServer

server.post('/login', controller.login)

server.use(middleWare) 

server.use('/api',router)


server.listen(PORT, ()=>{
    console.log(`Now listening ( ͡°╭͜ʖ╮͡° )  @ ${PORT}`)
})
