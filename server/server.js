const path = require('path');
const express = require('express');

const PORT = process.env.port || 3002;
const publicPath = path.join(__dirname, '../public');
const app = express();

app.use(express.static(publicPath));

app.listen(PORT, () => {
  console.log(`Server up and running on Port ${PORT}`);
});
