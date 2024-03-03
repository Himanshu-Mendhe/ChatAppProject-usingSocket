const express = require('express');
const http = require('http');
const socketIo = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = socketIo(server); 

io.on('connection', (socket) => {
    console.log('a user connected having socket id',socket.id);

    socket.on('msg_send', (data) => {
        console.log(data);

        io.emit('msg_recived', data); //both/ everyoe could see it
        //socket.broadcast.emit('msg_recived', data);// only receiver could see it
        //socket.emit('msg_recived', data)// only sender could see it
    })
})


app.use('/',express.static(__dirname + '/public')); //deduct all static files like html static


server.listen(3000, () => {
    console.log(`server started on port 3000`)
})