const {Sequelize} = require('sequelize');
const sequelize = require('./configDB');

const User = sequelize.define('User',{
    id_user:{
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false
    },
    login:{
       type:Sequelize.STRING,
        allowNull:false, 
        unique: true
    },
    password:{
        type:Sequelize.STRING,
        allowNull:false,
    }
})
module.exports = User;