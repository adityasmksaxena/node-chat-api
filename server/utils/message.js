const moment = require('moment');

const generateMessage = (from, text) => ({ from, text, createdAt: moment().valueOf() });
const generateLocationMessage = (from, coord) => ({
  from,
  url: `https://www.google.com/maps?q=${coord.latitude},${coord.longitude}`,
  createdAt: moment().valueOf(),
});

module.exports = {
  generateMessage,
  generateLocationMessage,
};
