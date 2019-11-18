//If we use this file db.js, we can play around with the db BUT will not save the changes. 

var data = require('./json/data.json');
var users = require('./json/db.json');
var usersList = require('./json/user_lists.json');

module.exports = function(){
    return Object.assign({},
            data,
            users,
            usersList
        )  
}