const path = require('path');
const http = require('http');
const express = require('express');
const socketIO = require('socket.io');

const { generateMessage, generateLocationMessage } = require('./utils/message');
const { isRealString } = require('./utils/validation');
const { Users } = require('./utils/users');

const PORT = process.env.PORT || 3002;
const publicPath = path.join(__dirname, '../public');
const app = express();
const server = http.createServer(app);

const io = socketIO(server);
const users = new Users();

app.use(express.static(publicPath));

io.on('connection', (socket) => {
  console.log('New Connection Found');
  
  socket.on('join', (params, callback) => {
    if (!isRealString(params.name) || !isRealString(params.room)) {
      return callback('Name and Room Name are required');
    }
    const { name, room } = params;
    socket.join(room);
    users.removeUser(socket.id);
    users.addUsers(socket.id, name, room);
    io.to(room).emit('updateUserList', users.getUserList(room));
    socket.emit('newMessage', generateMessage('Admin', 'Welcome to the site...!'));
    socket.broadcast.to(params.room).emit('newMessage', generateMessage('Admin', `${params.name} has joined.`));
    callback();
  });
  
  socket.on('disconnect', () => {
    const user = users.removeUser(socket.id);
    if(user) {
      io.to(user.room).emit('updateUserList', users.getUserList(user.room));
      io.to(user.room).emit('newMessage', generateMessage('Admin', `${user.name} has left..`));
    }
  });
  
  socket.on('createMessage', (message, callback) => {
    const { text } = message;
    const user = users.getUser(socket.id);
    if(user && isRealString(text)) {
      const from = user.name;
      io.to(user.room).emit('newMessage', generateMessage(from, text));
    }
    callback();
  });
  
  socket.on('createLocationMessage', (coord) => {
    io.emit('newLocationMessage', generateLocationMessage('Admin', coord));
  });
});

server.listen(PORT, () => {
  console.log(`Server up and running on Port ${PORT}`);
});
