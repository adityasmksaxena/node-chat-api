const socket = io();

socket.on('connect', () => {
  console.log('Connected to Server');
});

socket.on('newMessage', (message) => {
  const { from, text, createdAt } = message;
  const formatedTime = moment(createdAt).format('h:mm a');
  const template = jQuery('#message-template').html();
  const html = Mustache.render(template, { from, text, createdAt: formatedTime });
  jQuery('#messages').append(html);
});

socket.on('newLocationMessage', (message) => {
  console.log('New Location Message Received', message);
  const { from, url, createdAt } = message;
  const formatedTime = moment(createdAt).format('h:mm a');
  const template = jQuery('#location-message-template').html();
  const html = Mustache.render(template, { from, url, createdAt: formatedTime });
  jQuery('#messages').append(html);
});

socket.on('disconnect', () => {
  console.log('Disconnected from Server');
});

let messageTextBox = jQuery('[name=message]');
jQuery('#message-form').on('submit', (e) => {
  e.preventDefault();
  socket.emit('createMessage', {
    from: 'User',
    text: messageTextBox.val(),
  }, () => {
    messageTextBox.val('');
  });
});

const btnLocation = jQuery('#send-location');
const enableBtnLocation = () => {
  btnLocation.removeAttr('disabled').text('Send Location');
};
btnLocation.on('click', () => {
  if (!navigator.geolocation) {
    return alert('Geo Location is not supported by your browser');
  }
  btnLocation.attr('disabled', true).text('Sending Location...');
  navigator.geolocation.getCurrentPosition((position) => {
    enableBtnLocation();
    const { longitude, latitude } = position.coords;
    socket.emit('createLocationMessage', {
      longitude,
      latitude,
    });
  }, () => {
    enableBtnLocation();
    alert('Unable to fetch location')
  });
});
