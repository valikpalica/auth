const sequelize = require('./configDB')
require('./model');
require('./modalToken');
const promise = new Promise((resolve,reject)=>{
    sequelize.sync().then(data=>{
        resolve(data);
    }).catch(err => {reject(err);})
});

module.exports = promise;