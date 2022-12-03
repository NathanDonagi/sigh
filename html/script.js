var socket;
var usernameInput
var chatIDInput;
var messageInput;
var chatRoom;
var messages = [];
var delay = true;

console.log("server started")

function onload(){
  socket = io();
  usernameInput = document.getElementById("NameInput");
  messageInput = document.getElementById("ComposedMessage");

  socket.on("recieve", function(message){
    if (messages.length < 9){
      messages.push(message);
    }
    else{
      messages.shift();
      messages.push(message);
    }
    for (i = 0; i < messages.length; i++){
        document.getElementById("Message"+i).innerHTML = messages[i];
        document.getElementById("Message"+i).style.color = "#303030";
    }
  })
}

function Connect(){
  socket.emit("set_name", usernameInput.value);
}

function Send(){
  if ( messageInput.value.replace(/\s/g, "") != ""){
    socket.emit("send", messageInput.value);
    messageInput.value = "";
  }
}
