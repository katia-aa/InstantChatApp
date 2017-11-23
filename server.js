var express = require('express');
var app = express();

var http = require('http');
var server = http.Server(app);

app.use(express.static('client'));

var io = require('socket.io')(server);
var history = [];
var clientCount = 0

io.on('connection', function (socket) {
  io.emit('chatHistoy', history);
  

  // if (clientCount !== io.engine.clientsCount) {
  // 	clientCount = io.engine.clientsCount
  // }
  socket.on('messageDetails', function (msg) {
  	console.log(clientCount);
  	var message = msg.text
  	var user = msg.name
  	var result = user + " said: " + message
  	var listItem = '<li>' + result + '</li>'
  	history.push(listItem)
    io.emit('messageDetails', listItem);
  });
 //  socket.on('disconnect', function (socket) {
	// if (clientCount !== io.engine.clientsCount) {
 //  	  clientCount = io.engine.clientsCount
 //    }
 //  });
});



server.listen(8080, function() {
  console.log('Chat server running');
});