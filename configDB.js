const Sequelize = require("sequelize");
const sequelize = new Sequelize('sys360','root','1111',{
    dialect:'mysql',
    host:'localhost',
    define: {
        timestamps: false
    }
})
module.exports = sequelize;