const express = require('express');
const http = require('http');
const socketIo = require('socket.io');
const connect = require('./config/db-config');
const ejs = require('ejs');

const app = express();
const server = http.createServer(app);
const io = socketIo(server); 

io.on('connection', (socket) => {

    socket.on('join_room', (data) => {
        socket.join(data.roomId);
    })

    socket.on('msg_send', (data) => {
        console.log(data);

        io.to(data.roomId).emit('msg_recived', data); //both/ everyoe could see it
        //socket.broadcast.emit('msg_recived', data);// only receiver could see it
        //socket.emit('msg_recived', data)// only sender could see it
    })
})

app.set('view engine', 'ejs')
app.use('/',express.static(__dirname + '/public')); //deduct all static files like html static
app.get('/chat/:roomId', (req,res) => {
    res.render('index', {
        name: 'himanshu',
        id: req.params.roomId
    })
})

server.listen(3000, async() => {
    console.log(`server started on port 3000`);
    await connect();
    console.log('mongod connected');
})