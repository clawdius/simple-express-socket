const express = require('express');
const app = express();
const path = require('path');

app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'ejs')

app.use('/scripts', express.static(path.join(__dirname, 'node_modules/socket.io/client-dist/')))

app.route('/')
    .get((req, res) => {
        res.render('home');
    });

//Socket
require('./socket-conf');

const PORT = 9001
app.listen(PORT, () => {
    console.log('app at port: ' + PORT)
})