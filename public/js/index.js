const socket = io();
socket.on('connect', () => {
  console.log('Connected to Server');
});
socket.on('newMessage', (message) => {
  console.log('New Message Received', message);
  const { from, text } = message;
  const li = jQuery('<li></li>');
  li.text(`${from}: ${text}`);
  jQuery('#messages').append(li);
});
socket.on('newLocationMessage', (message) => {
  console.log('New Location Message Received', message);
  let { from, url } = message;
  let li = jQuery('<li></li>');
  let a = jQuery('<a target="_blank">My current location</a>');
  a.attr('href', url);
  li.text(`${from}: `);
  li.append(a);
  jQuery('#messages').append(li);
});
socket.on('disconnect', () => {
  console.log('Disconnected from Server');
});

jQuery('#message-form').on('submit', (e) => {
  e.preventDefault();
  socket.emit('createMessage', {
    from: 'User',
    text: jQuery('[name=message]').val(),
  }, () => {});
});

const btnLocation = jQuery('#send-location');
btnLocation.on('click', () => {
  if (!navigator.geolocation) {
    return alert('Geo Location is not supported by your browser');
  }
  navigator.geolocation.getCurrentPosition((position) => {
    const { longitude, latitude } = position.coords;
    socket.emit('createLocationMessage', {
      longitude,
      latitude,
    });
  }, (err) => alert('Unable to fetch location'));
});