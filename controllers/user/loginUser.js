const DataBase = require('../../dataBase').getInstance();
module.exports = async (req, res) => {
      try {
        const UserModel = DataBase.getModel('User');
        const {email, password} = req.body;
            if (!UserModel) throw new Error('Can not connect to DATABASES');
            if (!email || !password) throw new Error('Some field is empty');

            const isRegistered = await UserModel.findOne({
                  where: {
                        email,
                        password
                  }
            });
            if (!isRegistered) throw new Error('Такого користувача не існує.Перевірте логін або пароль')
            const allUsers = await UserModel.findAll()
res.render('usersPage',{allUsers})
      }
      catch (e) {
            res.render('errorPage', {message: e.message})
      }
}