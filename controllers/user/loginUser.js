const DataBase = require('../../dataBase').getInstance();
const tokinazer = require('../../helpers/tokinazer');

module.exports = async (req, res) => {
    try {
        const UserModel = DataBase.getModel('User');
        const TokenModel = DataBase.getModel('Token');
        const {email, password} = req.body;
        if (!UserModel && !TokenModel) throw new Error('Can not connect to DATABASES');
        if (!email || !password) throw new Error('Some field is empty');

        const isRegistered = await UserModel.findOne({
            where: {
                email,
                password
            }
        });
        if (!isRegistered) throw new Error('Такого користувача не існує.Перевірте логін або пароль')

        const {name, id} = isRegistered.dataValues;

        const {accessToken} = tokinazer(name, email);

        await TokenModel.create({
            userID: id,
            accessToken:accessToken
        });

        // const allUsers = await UserModel.findAll();

        // console.log(tokens);
        res.end(accessToken)
    } catch (e) {
        res.render('errorPage', {message: e.message})
    }
}