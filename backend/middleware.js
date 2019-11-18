const verify = require('./auth')

function middleWare(req,res,next){
    if (!req.headers.auth){
        const status = 401
        const message = '[!]Access Denied'
        res.status(status).json({status,message})
        return
    }
    try {
        let verifyTokenResult = verify.verifyToken(req.headers.auth)
        if (verifyTokenResult instanceof Error){
            const status = 401
            const message = '[!]Invalid Access Token'
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
}

module.exports = middleWare