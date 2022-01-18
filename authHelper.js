const private_key = require('./private_key.json');
const jwt = require('jsonwebtoken');
const Token = require('./modalToken');

const generateAccessToken = (userId) =>{
    let paylaod_access = {
        userId,
        type:private_key.access_token.type
    }
    let option = {expiresIn:private_key.access_token.expiresIn}
    let access_token = jwt.sign(paylaod_access,private_key.access_token.secret_key,option);
    return access_token
}
const generateRefreshToken = (userId) =>{
    let paylaod_refresh = {
        userId,
        type:private_key.refresh_token.type
    }
    let option = {expiresIn:private_key.refresh_token.expiresIn};
    let refresh_token = jwt.sign(paylaod_refresh,private_key.refresh_token.secret_key,option);
    return refresh_token;
}

const replaceDBRefreshToken = (id_user,token) => Token.destroy({
    where:{ 
        id_user
    }
}).then(()=>{ 
    Token.create({id_user,token});
}) 

module.exports = {
    generateAccessToken,
    generateRefreshToken,
    replaceDBRefreshToken
}