const fs = require('fs')
const jsonServer = require('json-server')
const bodyParser = require('body-parser')
const jwt = require('jsonwebtoken')
const PORT = 8000
const SECRET_KEY = require('./secret')
const expiresIn = '3h'
const server = jsonServer.create()
const router = jsonServer.router('./db.json')
const userDb = JSON.parse(fs.readFileSync('./db.json', 'UTF-8'))


server.use(bodyParser.json())
server.use(jsonServer.defaults());

function verifyToken(token){
    return jwt.verify(token, SECRET_KEY, (err,decode) => decode != undefined? decode:err)
}

function isAuthenticated({username, password}){
    return userDb.users.findIndex(user => user.username === username && user.password === password) !== -1
}

function createToken(payLoad){
    return jwt.sign(payLoad, SECRET_KEY, {expiresIn})
}

server.post('/register', (req,res) => {
    const {username, password, firstName, lastName, status} = req.body;
    if(isAuthenticated({username, password}) === true) {
      const status = 401;
      const message = 'username and Password already exist';
      res.status(status).json({status, message});
      return
    }
    
    fs.readFile('./db.json', (err, data) => {
        if (err) {
            const status = 401;
            const message = 'ERROR!'
            res.status(status).json({status,message})
            return
        }

       var data = JSON.parse(data)
       data.users.push({id: (data.users.length+1), username: username, password: password, firstName: firstName, lastName: lastName, status: status})

       fs.writeFile('./db.json', JSON.stringify(data), 'utf8', (err) => {
           if (err) throw err;
           
           const status = 201
           const message = 'Successfully registered new user!'
           res.status(status).json({status, message})
           return
       })      
    })

})

server.post('/login', (req,res)=>{
    const { username, password } = req.body
    if (isAuthenticated({username, password}) === false){
        const status = 401
        const message = 'Incorrect username or Password'
        res.status(status).json({status,message})
        return
    }
    const access_token = createToken({username,password})
    res.status(200).json({access_token})
})


server.use((req,res,next)=>{
    if (!req.headers.authorization){
        const status = 401
        const message = 'Access Denied'
        res.status(status).json({status,message})
        return
    }
    try {
        let verifyTokenResult = verifyToken(req.headers.authorization.split(' ')[1])
        if (verifyTokenResult instanceof Error){
            const status = 401
            const message = 'invalid access token'
            res.status(status).json({status, message})
            return
        }
        next()
    }catch(err){
        const status = 401
        const message = 'Error: invalid access_token'
        res.status(status).json({status, message})
        res.status(status).json({status,message})
    }
}) 
// server.use(router)
server.use(router)

server.listen(PORT, ()=>{
    console.log(`Now listening ( ͡°╭͜ʖ╮͡° )  @ ${PORT}`)
})
