const bcrypt = require('bcrypt');

export default function Compare(UnHash:string, Hash: string){
    return bcrypt.compare(UnHash,Hash).then(function(res : boolean){
        return res ;
    })
}