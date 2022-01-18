const User = require('./model');

class DBAuth {
    async auth(login){
        let result = await User.findOne({
            where:{login:login}
        })
        return result;
    }
    async registration(login,password){
        await User.create({
            login:login,
            password:password            
        });
    }   
}

module.exports = new DBAuth()