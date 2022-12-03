const http = require("http");
const express = require("express");
const socketio = require("socket.io");
const path = require("path");

const app = express();
const httpserver = http.Server(app);
const io = socketio(httpserver);

const gamedirectory = path.join(__dirname, "html");

console.log("server started")

app.use(express.static(gamedirectory));

httpserver.listen(3000);

var usernames = [];

io.on('connection', function(socket){
  var clientIp = socket.request.connection.remoteAddress;
  console.log(clientIp)
  
  socket.on("set_name", function(username){
    if (username != ""){
      usernames[socket.id] = username;
     io.emit("recieve", username + " has entered the chat.");
    }
  })

  socket.on("send", function(message){
    io.emit("recieve", usernames[socket.id] +" : " + message);
  })
})
