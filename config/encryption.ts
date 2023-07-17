const bcrypt = require('bcrypt');

export function Compare(UnHash:string, Hash: string){
    return bcrypt.compare(UnHash,Hash).then(function(res : boolean){
        return res ;
    })
}

export function encryptPassword(password: string){
    return bcrypt.hash(password,2).then(function(hash: string){
        return hash;
    })
}