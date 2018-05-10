const socket = io();
socket.on('connect', () => {
  console.log('Connected to Server');
  socket.emit('createMsg', {to: 'Andrew', text: 'hello'});
});
socket.on('newMsg', (msg) => {
  console.log('New Msg Received', msg);
});
socket.on('disconnect', () => {
  console.log('Disconnected from Server');
});