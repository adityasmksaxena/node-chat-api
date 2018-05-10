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
  socket.on('disconnect', () => {
    console.log('Client Disconnected');
  });
});

server.listen(PORT, () => {
  console.log(`Server up and running on Port ${PORT}`);
});