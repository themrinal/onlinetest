const express = require('express');

const app = express();
const port = process.env.port || 3000;

app.get('/', (req, res) => {
  res.send('This is dashboard')
});

app.listen(port, () => {
  console.log('Listening to port 3000');
});

