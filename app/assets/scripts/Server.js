const express = require('express');
const socketIO = require('socket.io');
const http = require('http');
let jqueryImage;

// app set up
const app = express();
const server = http.Server(app);
// const  = new socket(server);
let port = process.env.PORT || 3000;

// static files
app.use(express.static('app'));

// socket setup & pass SERVER
const io = new socketIO(server);

// on client connect
io.on('connection', (socket) => {
  socket.emit('append', );

    console.log('made connection!!!');

    // events
    socket.on('client-image', function(data){
        console.log('SERVER ' + data.image);
        io.sockets.emit('client-image', data);
    });

    socket.on('new-client-clone', function(data){
      jqueryImage = data.clone;
      console.log('jqueryImage ' + JSON.stringify(jqueryImage));
      socket.emit('append', jqueryImage);
    });



});



// errors
io.on('connect_error', function(){
    console.log('fail');
});


server.listen(port, () => {
    console.log('server running....');
});
