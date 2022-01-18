const jwt = require('jsonwebtoken');
const secret_key = require('../private_key.json')
module.exports = (req,res,next) =>{
    try {
        const token = req.headers.authorization.split(' ')[1]
        if(!token){
            return res.status(403).json({message:'Особа не виявлена'});
        }
        try {
            const decodeData = jwt.verify(token,secret_key.access_token.secret_key);
            if(decodeData.type !== 'access'){
                res.status(400).json({message:'Invalid token'});
                return
            }
        } catch (e) {
            if(e instanceof jwt.JsonWebTokenError){
                res.status(400).json({message:'Invalid token'});
                return
            }
            else if( e instanceof jwt.TokenExpiredError){
                res.status(400).json({message:'Invalid token'});
                return
            }
        }
        next();
    } catch (error) {
        res.status(403).json({message:'Особа не виявлена'});
    }
}