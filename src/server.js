const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
const app = express();
const server = require('http').Server(app);
const io = require('socket.io')(server);
const cors = require('cors');

app.use(cors);

io.on('connection', socket => {
    console.log('ok');
});

mongoose.connect('mongodb+srv://atilarampazo:ztascani1978@rocketstack-zxayo.mongodb.net/test?retryWrites=true',
{
    useNewUrlParser: true
});
/* Deixando todo o io disponivel para toda a aplicação! */
app.use(req,res , next => {
    req.io = io;
    return next();
});

app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use('/files',express.static(path.resolve(__dirname,'..','tmp')));
app.use(require('./routes'));

server.listen(3333);