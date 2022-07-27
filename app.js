const express = require('express')
var app = express();
var http = require('http').Server(app)
const io = require('socket.io')(http);

app.use(express.static('static'));

http.listen(5050, ()=> {
	console.log("Server running... ")
});

io.on('connection',socket=>{
    console.log("New connection made by socket : ",socket.id);

    socket.on('chat',data=>{
        io.sockets.emit('chat',data);
    });

    socket.on('typing',data=>{
        socket.broadcast.emit('typing',data);
    });
});