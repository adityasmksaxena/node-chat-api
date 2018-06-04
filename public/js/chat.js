const socket = io();

const scrollToBottom = () => {
  // Selectors
  const messages = jQuery('#messages');
  const newMessage = messages.children('li:last-child');
  // Heights
  const clientHeight = messages.prop('clientHeight');
  const scrollTop = messages.prop('scrollTop');
  const scrollHeight = messages.prop('scrollHeight');
  const newMessageHeight = newMessage.innerHeight();
  const lastMessageHeight = newMessage.prev().innerHeight();
  if (clientHeight + scrollTop + newMessageHeight + lastMessageHeight >= scrollHeight) {
    messages.scrollTop(scrollHeight);
    console.log('should scroll');
  }
};

socket.on('connect', () => {
  const params = jQuery.deparam(window.location.search);
  socket.emit('join', params, (err) => {
    if (err) {
      alert(err);
      window.location.href = '/';
    } else {
      console.log('No Error');
    }
  });
});

socket.on('newMessage', (message) => {
  const { from, text, createdAt } = message;
  const formatedTime = moment(createdAt).format('h:mm a');
  const template = jQuery('#message-template').html();
  const html = Mustache.render(template, { from, text, createdAt: formatedTime });
  jQuery('#messages').append(html);
  scrollToBottom();
});

socket.on('newLocationMessage', (message) => {
  console.log('New Location Message Received', message);
  const { from, url, createdAt } = message;
  const formatedTime = moment(createdAt).format('h:mm a');
  const template = jQuery('#location-message-template').html();
  const html = Mustache.render(template, { from, url, createdAt: formatedTime });
  jQuery('#messages').append(html);
  scrollToBottom();
});

socket.on('disconnect', () => {
  console.log('Disconnected from Server');
});

socket.on('updateUserList', (users) => {
  const ol = jQuery('<ol></ol>');
  users.forEach((user) => {
    ol.append(jQuery('<li></li>').text(user));
    jQuery('#users').html(ol);
  });
});

let messageTextBox = jQuery('[name=message]');
jQuery('#message-form').on('submit', (e) => {
  e.preventDefault();
  socket.emit('createMessage', {
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
