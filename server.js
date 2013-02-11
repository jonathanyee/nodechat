var express = require('express'),
        app = express(),
     server = require('http').createServer(app),
         io = require('socket.io').listen(server);

server.listen(4000);
io.set('log level', 2);
console.log('Server running on http://localhost:4000');

app.configure(function() {
  app.use(express.static(__dirname + '/public'));
    app.use(app.router);
});

app.get('/', function (req, res) {
  res.sendfile(__dirname + '/index.html');
});

var usernames = {};

io.sockets.on('connection', function (socket) {
  socket.on('addUser', function(username) {
    socket.username = username;
    usernames[username] = username;
    socket.emit('displayChat', 'SERVER', 'you have connected.');
    socket.broadcast.emit('displayChat', 'SERVER', username + ' has connected to this room.');
  });

  socket.on('sendChat', function (data) {
    io.sockets.emit('displayChat', socket.username, data);
  });
});