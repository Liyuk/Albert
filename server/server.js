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
var robotName = '小冰';

function enunicode(code){
    code=code.replace(/[\u00FF-\uFFFF]/g,function($0){
            return '\\u'+$0.charCodeAt().toString(16);
    });
    return code;
}

io.sockets.on('connection', function (socket) {
    var signedIn = false;

    socket.on('newMessage', function (text) {
        io.sockets.emit('newMessage',{
            userName: socket.userName,
            text: text
        });
        // robot request url
        console.log(socket.userName, text);
        if(socket.userName !== robotName) {
            setTimeout(() => {
                // axios.get(`http://127.0.0.1:5000/?que=${enunicode(text)}`).then(res => { 
                    // console.log(res.data); 
                    io.sockets.emit('newMessage',{
                        userName: robotName,
                        text: 'mock data',
                        theano: 'happy',
                        stats: {
                            area: 'none',
                            food: 'chinese',
                            pricerage: 'cheap'
                        }
                    })
                // })
                // .catch(error => { 
                //     console.log(error); 
                // });
            }, 500);
        }
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