var app = require('http').createServer(handler),
     io = require('socket.io').listen(app),
     fs = require('fs');

app.listen(4000);
io.set('log level', 2);
console.log('Server running on http://localhost:4000');

function handler (req, res) {
  fs.readFile(__dirname + '/index.html',
  function (err, data) {
    if (err) {
      res.writeHead(500);
      return res.end('Error loading index.html');
    }

    res.writeHead(200);
    res.end(data);
  });
}

io.sockets.on('connection', function (socket) {
  socket.on('sendChat', function (data) {
    // console.log('sendChat', data);
    io.sockets.emit('displayChat', data);
  });
});