const DataBase = require('../../dataBase').getInstance();
module.exports = async (req, res) => {
    try {
        const UserModel = DataBase.getModel('User');
        const id = req.params.id;

        if (!UserModel) throw new Error('Can not connect to DATABASES');
        if (!id) throw new Error('Bad request');

        await UserModel.destroy({
            where: {
                id
            }
        });

        const allUsers = await UserModel.findAll();
        res.render('usersPage', {allUsers})
    } catch (e) {
        res.render('errorPage', {message: e.message})

    }

};