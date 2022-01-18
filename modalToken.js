const {Sequelize} = require('sequelize');
const sequelize = require('./configDB');

const Token = sequelize.define('Token',{
    id_user:{
        type: Sequelize.INTEGER,
        allowNull: false
    },
    token:{
        type:Sequelize.STRING,
        allowNull:false,
    }
})

module.exports = Token;