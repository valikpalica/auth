const express = require('express');
const router = express.Router();
const controller = require('./controller');
const {body} = require('express-validator')
const authMiddleware = require('./middleware/tokenVerife');
const gateway = require('./gateway/gateway');




router.post('/auth',controller.auth);
router.post('/reg',
    body('login','Логін не повинен бути пустим').notEmpty(),
    body('password','Пароль повинен бути більше восьми символів').isLength({min:8})
,controller.registration);
router.post('/refresh',controller.refreshTokens);


//add authMiddleware 
//router.use('/gateway',gateway);

module.exports = router;