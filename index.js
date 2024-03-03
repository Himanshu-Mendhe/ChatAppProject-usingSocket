const express = require('express');
const http = require('http');
const socketIo = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = socketIo(server); 

io.on('connection', (socket) => {
    console.log('a user connected having socket id',socket.id);

    socket.on('from_clint', () => {   // on listrn to the event
        console.log('event comming from clint');  
    })

    setInterval(() => {
        socket.emit('from_server') //emit publishes the event
    },2000
    );
})




app.use('/',express.static(__dirname + '/public')); //deduct all static files like html static


server.listen(3000, () => {
    console.log(`server started on port 3000`)
})