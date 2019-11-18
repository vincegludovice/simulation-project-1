const fs = require('fs')
const faker = require('faker')

function generateUsers(){
    let users = [];

    for (let id=1; id<=50; id++){
        let firstName = faker.name.firstName();
        let lastName = faker.name.lastName();
        let username = faker.internet.userName();
        let status = faker.random.boolean();
        status = status === true? 'active': 'inactive'
        users.push({
            "id":id,
            "firstName": firstName,
            "lastName": lastName,
            "userName": username,
            "status": status
        })
    }
    return {"data": users}
}

let dataObj = generateUsers();
fs.writeFileSync('./backend/data.json', JSON.stringify(dataObj,null, '\t'));
