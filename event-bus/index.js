const express = require('express');
const axios = require('axios');

const app = express();

app.use(express.json());

app.post('/events', (req, res) => {
  const events = req.body;

  axios.post('http://localhost:4000', events);
  axios.post('http://localhost:4001', events);
  axios.post('http://localhost:4002', events);

  res.status(200).send({ status: 'OK' });
});

app.listen(4005, () => {
  console.log('Listening on PORT 4005');
});
