// Import modules
var express = require('express');
var path = require('path');
var ejs = require('ejs');
var axios = require('axios');

// Create server
var app = express()
  , server = require('http').createServer(app)
  , io = require('socket.io').listen(server);
var port = process.env.PORT || 3000;
server.listen(port);

// Return index.html for '/'
app.get('/', function (req, res) {
    res.render('index');
});

// Set path for views and static resources
app.set('views', './client/src/html');
app.set('view engine', 'html');
app.engine('html', ejs.renderFile);
app.use('/static', express.static('./client/build'));

var userNumber = 1;

io.sockets.on('connection', function (socket) {
    var signedIn = false;

    socket.on('newMessage', function (text) {
        io.sockets.emit('newMessage',{
            userName: socket.userName,
            text: text
        })
        // robot request url
        axios.get(`http://127.0.0.1:5000/?que=${text}`) 
            .then(res => { 
                console.log(res.data); 
                io.sockets.emit('newMessage',{
                    userName: 'Robot：',
                    text: res.data
                })
            }) 
            .catch(error => { 
                console.log(error); 
            });  
    });

    socket.on('signIn', function (userName) {
        if (signedIn) return;

        // we store the username in the socket session for this client
        socket.userName = userName;
        ++userNumber;
        signedIn = true;

        io.sockets.emit('userJoined', {
            userName: userName,
            userNumber: userNumber
        });
    });

    socket.on('disconnect', function () {
        if (signedIn) {
            --userNumber;

            io.sockets.emit('userLeft', {
                userName: socket.userName,
                userNumber: userNumber
            });
        }
    });

});