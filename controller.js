const bcrypt = require('bcrypt');
const DBAuth = require('./DB');
const {validationResult} = require('express-validator')
const jwt = require('jsonwebtoken');
const helper = require('./authHelper');
const secret_key = require('./private_key.json');
const Token = require('./modalToken');


const updateToken = (userId) =>{
    const access_token = helper.generateAccessToken(userId);
    const refresh_token = helper.generateRefreshToken(userId);
    
    return helper.replaceDBRefreshToken(userId,refresh_token).then(()=>({
        access_token,
        refresh_token
    }))
}

class Controller {
    async auth(req,res){
        try {
            let {login,password} = req.body;
            let response = await DBAuth.auth(login);
            let compare = await bcrypt.compare(password,response.password);
            if(compare){
                updateToken(response.id_user).then(tokens=>{
                    res.status(200).json({message:'Авторизація успішна',tokens});
                })
            }
            else{
                res.status(400).json({message:'Паролі не співпадають'})
            }
        } catch (error) {
            res.status(400).json({message:'Помилка при авторизації'})
        }
    }
    async registration(req,res){
        try {
            const errors = validationResult(req);

            if(!errors.isEmpty()){
                res.status(400).json({message:'Помилка при авторизації',errors});
                return
            }
            let {login,password} = req.body;
            let password_crypt = await bcrypt.hash(password,7);
            await DBAuth.registration(login,password_crypt);
            res.status(200).json({message:'Реєстрація успішна'});
        } catch (error) {
            console.log(error);
            res.status(400).json({message:'Помилка при реєстрації'})
        }
    }

    refreshTokens = (req,res) =>{
        const { refreshToken }  = req.body;
        let paylaod;
        try {
            paylaod = jwt.verify(refreshToken,secret_key.refresh_token.secret_key);
            if(paylaod.type !== 'refresh'){
                res.status(400).json({message:'Invalid token'});
                return;
            }
        } catch (e) {
            if(e instanceof jwt.TokenExpiredError){
                res.status(400).json({message:'Token expired'});
                return
            }
            else if(e instanceof jwt.JsonWebTokenError){
                res.status(400).json({message:'Invalid Token'});
                return
            }
        }
        console.log(paylaod);
        Token.findOne({where:{
            id_user: paylaod.userId
        }}).then(token=>{
            if(token === null){
                throw new Error('Invalid token');
            }
            return updateToken(token.id_user);
        }).then(tokens=>{
                res.json(tokens);
        }).catch(err=>{
            res.status(400).json({message:err.message})
        })
    }
}



module.exports = new Controller()