const express = require('express');
const app = express();
const http = require('http');
const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server, {
    cors: {
      origin: "*",
      methods: ["GET", "POST"],
      allowedHeaders: ["my-custom-header"],
      credentials: true
    }
});

let users = [];

const addUser = (userInfo) => {
  users.push(userInfo);
};

const removeUser = (socketId) => {
  users = users.filter(user => user.socketId !== socketId);
};

io.on("connection", socket => {
  // register
  socket.on("register", data => {
    addUser({
      userId: data.userId,
      socketId: socket.id
    });
    // console.log("connect", users);
  });

  // update user online
  io.emit("updateUserOnline", users);

  // send message
  socket.on("clientSendMessage", data => {
    const receiver = users.find(user => data.receiver._id === user.userId);
    console.log(data, users);
    if (receiver) {
      io.to(receiver.socketId).emit("serverSendMessage", {
        sender: data.sender,
        text: data.text
      });
    }
  });

  // disconnect
  socket.on("disconnect", () => {
    removeUser(socket.id);
    // console.log("disconnect", users);
  });
});

const PORT = process.env.PORT || 3002;

server.listen(PORT, () => {
  console.log('listening on *:' + PORT);
});