const express = require('express');
const app = express();
const path = require('path');
const expBars = require('express-handlebars');





// const http = require('http').createServer(app);
// const io = require('socket.io')(http);
//
// app.get ('/chat', function (req, res) {
//     res.sendFile(__dirname + '/main.html');
// });
//
// io.on('connection', (socket) => {
//     console.log('User connected');
//
//         socket.on('sendMessage',(msg) => {
//         io.emit('getMessge', msg);
//     });
// });




app.use(express.static(path.join(__dirname, 'public', 'views')));

app.use(express.json());
app.use(express.urlencoded());

app.engine('hbs', expBars({
    extname: '.hbs',
}));

app.set('view engine', '.hbs');
app.set('views', path.join(__dirname, 'public', 'views'));

const DataBase = require('../MyFirst/dataBase/index').getInstance();
DataBase.setModels();


const homePage = require('./controllers/homePage');
const register = require('./controllers/registerPage');
const login = require('./controllers/loginPage');
const regUser = require('./controllers/user/registerUser');
const logUser = require('./controllers/user/loginUser');
const delUser = require('./controllers/user/deleteUser');
const usersBase = require('./controllers/user/usersBase');


app.get('/', homePage);
app.get('/login', login);
app.get('/register', register);
app.get ('/baseofusers', usersBase);

app.post('/reguser', regUser);
app.post('/loguser', logUser);
app.get('/delete/:id', delUser);


// app.listen(3000, () => {
//     console.log('Listen 3000....')
// });




const http = require('http').createServer(app);

const io = require('socket.io')(http);

app.get('/chat', function (req, res) {
    res.sendFile(__dirname + '/main.html');
});


io.on('connection', (socket) => {

    console.log('USER CONNECTED')

    socket.on('sendMessage', (msg) => {
        io.emit('getMessge', msg);
    });


});


http.listen(3000, () => {
    console.log('listening on 3000');
});
