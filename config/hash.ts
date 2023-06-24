
const bcrypt = require('bcrypt');

export default function encryptPassword(password: string){
    return bcrypt.hash(password,2).then(function(hash: string){
        return hash;
    })
}