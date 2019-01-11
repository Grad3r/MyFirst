
module.exports = (sequalize, DataTypes) => {
    const User = sequalize.define('User', {
        id: {
            type: DataTypes.INTEGER,
            primaryKey:true,
            autoIncrement: true
        },
        name: {
            type: DataTypes.STRING
        },
        password: {
            type: DataTypes.STRING
        },
        email: {
            type: DataTypes.STRING
        }
    },{
        tableName: 'users',
        timestamps: false
    });
    return User;
};