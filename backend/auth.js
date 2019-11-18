const fs = require('fs')
const jwt = require('jsonwebtoken')
const userDb = JSON.parse(fs.readFileSync('./backend/db.json', 'UTF-8'))
const SECRET_KEY = require('./secret')
const expiresIn = '1h'
const argon2 = require('argon2')

let SECRET_TOKEN = ''

function verifyToken(token){
    return jwt.verify(token, SECRET_KEY, (err,decode) => decode != undefined? decode:err)
}

function isAuthenticated({username, password}){
    return userDb.users.findIndex(user => user.username === username && user.password === password) !== -1
}

function createToken(payLoad){
    return jwt.sign(payLoad, SECRET_KEY, {expiresIn})
}

//for hashing the token
async function secure_token(token){
    return await argon2.hash(token)
}

async function verify_hash(hash){
    return await argon2.verify(hash, SECRET_TOKEN)
}

function getSecuredToken(token){
    return SECRET_TOKEN = token
}

module.exports = {
    verifyToken,
    isAuthenticated,
    createToken,
    secure_token,
    verify_hash,
    getSecuredToken
}