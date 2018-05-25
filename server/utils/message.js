const generateMessage = (from, text) => ({ from, text, createdAt: new Date().getTime() });
const generateLocationMessage = (from, coord) => ({
  from,
  url: `https://www.google.com/maps?q=${coord.latitude},${coord.longitude}`,
  createdAt: new Date().getTime(),
});

module.exports = {
  generateMessage,
  generateLocationMessage,
};
