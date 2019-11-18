const auth = require('../auth')

async function login(req,res){
    const { username, password } = req.body
    if (auth.isAuthenticated({username, password}) === false){
        const status = 401
        const message = 'Incorrect username or Password'
        res.status(status).json({status,message})
        return
    }
    let access_token = auth.createToken({username,password})
    //secured_token = await auth.secure_token(access_token)
    
    res.status(200).json({username,access_token})
}

// function register(req,res){
//     const {username, password, firstName, lastName, status} = req.body;
//     if(auth.isAuthenticated({username, password}) === true) {
//       const status = 401;
//       const message = 'username and Password already exist';
//       res.status(status).json({status, message});
//       return
//     }
    
//     fs.readFile('./db.json', (err, data) => {
//         if (err) {
//             const status = 401;
//             const message = 'ERROR!'
//             res.status(status).json({status,message})
//             return
//         }

//        var data = JSON.parse(data)
//        data.users.push({id: (data.users.length+1), username: username, password: password, firstName: firstName, lastName: lastName, status: status})

//        fs.writeFile('./db.json', JSON.stringify(data), 'utf8', (err) => {
//            if (err) throw err;
           
//            const status = 201
//            const message = 'Successfully registered new user!'
//            res.status(status).json({status, message})
//            return
//        })      
//     })
// }

module.exports = {
    login
}