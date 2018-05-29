const express = require('express');
const socketIO = require('socket.io');
const http = require('http');


// app set up
const app = express();
const server = http.Server(app);
// const  = new socket(server);
let port = process.env.PORT || 3000;

// static files
app.use(express.static('app'));

// socket setup & pass SERVER
const io = new socketIO(server);

io.on('connection', (socket) => {

    console.log('made connection!!!');

    // events
    socket.on('client-image', function(data){
        console.log('SERVER ' + data.image);
        io.sockets.emit('client-image', data);
    });

    socket.on('new-client-clone', function(data){
      console.log(data);
      io.sockets.emit('new-client-clone', data);
    });

});

// errors
io.on('connect_error', function(){
    console.log('fail');
});


server.listen(port, () => {
    console.log('server running....');
});
