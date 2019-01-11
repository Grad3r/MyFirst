const Sequelize = require('sequelize');
const fs = require('fs');
const resolve = require('path').resolve;


module.exports = (() => {
    let instance;

    function initConnection() {
        let client = new Sequelize('myorm', 'root', 'password', {
            host: 'localhost',
            dialect: 'mysql',
        });
        let models = {};

        function getModels() {
            fs.readdir('./dataBase/models', (err, files) => {
                files.forEach(file => {
                    const [modelName] = file.split('.');
                    models [modelName] = client.import(resolve(`./dataBase/models/${modelName}`))
                })
            })
        }
        return {
            getModel: (modelName) => {
                return models[modelName]
            },
            setModels: () => getModels()
        }
    }
    return {
        getInstance: () => {
            if (!instance) {
                instance = initConnection()
            }
            return instance;
        }
    }
})();