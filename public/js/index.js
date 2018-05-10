const socket = io();
socket.on('connect', () => {
  console.log('Connected to Server');
});
socket.on('newMessage', (message) => {
  console.log('New Message Received', message);
});
socket.on('disconnect', () => {
  console.log('Disconnected from Server');
});