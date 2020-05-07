const axios = require('axios');
const express = require('express');

const app = express();

app.use(express.json());

app.post('/events', (req, res) => {
  const { type, data } = req.body;

  return res.status(200).end();
});

app.listen(4003, () => {
  console.log('Listening on PORT 4003');
});
