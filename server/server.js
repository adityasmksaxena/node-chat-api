const path = require('path');
const http = require('http');
const express = require('express');
const socketIO = require('socket.io');

const { generateMessage } = require('./utils/message');

const PORT = process.env.PORT || 3002;
const publicPath = path.join(__dirname, '../public');
const app = express();
const server = http.createServer(app);

const io = socketIO(server);

app.use(express.static(publicPath));

io.on('connection', (socket) => {
  console.log('New Connection Found');
  socket.emit('newMessage', generateMessage('Admin', 'Welcome to the site...!'));
  socket.broadcast.emit('newMessage', generateMessage('Admin', 'Some new user joined...!'));
  socket.on('disconnect', () => {
    console.log('Client Disconnected');
  });
  socket.on('createMessage', (message) => {
    console.log('New Message Created', message);
    const { from, text } = message;
    io.emit('newMessage', generateMessage(from, text));
  });
});

server.listen(PORT, () => {
  console.log(`Server up and running on Port ${PORT}`);
});
