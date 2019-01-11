const DataBase = require('../../dataBase').getInstance();
module.exports = async (req, res) => {
    const UserModel = DataBase.getModel('User');
    const allUsers = await UserModel.findAll()
    res.render('usersPage',{allUsers})
};