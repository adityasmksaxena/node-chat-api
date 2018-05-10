const path = require('path');
const http = require('http');
const express = require('express');
const socketIO = require('socket.io');

const PORT = process.env.PORT || 3002;
const publicPath = path.join(__dirname, '../public');
const app = express();
const server = http.createServer(app);

const io = socketIO(server);

app.use(express.static(publicPath));

io.on('connection', (socket) => {
  console.log('New Connection Found');
  socket.emit('newMessage', {
    from: 'Admin',
    text: 'Welcome to the site...!',
    createdAt: new Date().getTime(),
  });
  socket.broadcast.emit('newMessage', {
    from: 'Admin',
    text: 'Some new user joined...!',
    createdAt: new Date().getTime(),
  });
  socket.on('disconnect', () => {
    console.log('Client Disconnected');
  });
  socket.on('createMessage', (message) => {
    console.log('New Message Created', message);
    const { from, text } = message;
    io.emit('newMessage', { from, text, createdAt: new Date().getTime() });
  });
});

server.listen(PORT, () => {
  console.log(`Server up and running on Port ${PORT}`);
});
