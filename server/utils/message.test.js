const expect = require('expect');

const { generateMessage, generateLocationMessage } = require('./message');

describe('generateMessage', () => {
  it('should generate correct message object', () => {
    const from = 'Adi';
    const text = 'Hello World';
    const message = generateMessage(from, text);
    expect(typeof message.createdAt).toBe('number');
    expect(message).toMatchObject({ from, text });
  });
});

describe('generateLocationMessage', () => {
  it('should generate correct location object', () => {
    const from = 'Deb';
    const latitude = 10;
    const longitude = 20;
    const url = 'https://www.google.com/maps?q=10,20';
    const coord = { latitude, longitude };
    const message = generateLocationMessage(from, coord);
    expect(typeof (message.createdAt)).toBe('number');
    expect(message).toMatchObject({ from, url });
  });
});