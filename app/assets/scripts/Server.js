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

let jqueryImage;

// on client connect
io.on('connection', (socket) => {

  console.log('client has entered...');

  socket.emit('new-client-append', jqueryImage);


    // events
    socket.on('client-image', (data) => {
        console.log('SERVER ' + data.image);
        socket.broadcast.emit('client-image', data);
    });


    socket.on('new-client-append', function(data){
            jqueryImage = data.clone;
            console.log('jqueryImage ' + JSON.stringify(jqueryImage));
      });



    // errors
    // io.on('error', function (err) {
    //     console.log(err);
    // });

    // io.on('connect_error', function(){
    //     console.log('fail');
    // });

});


server.listen(port, () => {
    console.log('server running....');
});
