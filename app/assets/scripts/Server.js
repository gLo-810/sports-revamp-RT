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


let domClone;

// on client connect
io.on('connection', (socket) => {




  console.log('client has entered...');


  socket.on('new-client-append', function(data){
            domClone = data;
            console.log('***NEW-CLIENT-APPEND***' + JSON.stringify(domClone));
    });

    socket.emit('new-client-append', domClone);



    // events

      socket.on('client-real-time', (data) => {
        // setTimeout(() => {
          io.sockets.emit('client-real-time', data);
          console.log('***CLIENT-REAL-TIME***' + data.image + '**************');
        // }, 2000);
      });

      socket.on('reset', (data) => {
        domClone = "";
        console.log('***RESET***' + JSON.stringify(data.clear));
        io.sockets.emit('reset', data);
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
