const axios = require('axios');
const express = require('express');

const app = express();

app.use(express.json());

function isModerate(string) {
  return string.toLowerCase().includes('fuck');
}

app.post('/events', async (req, res) => {
  const { type, data } = req.body;

  if (type === 'CommentCreated') {
    const status = isModerate() ? 'approved' : 'rejected';

    await axios.post('http://localhost:4005/events', {
      type: 'CommentModerated',
      data: {
        ...data,
        status,
      },
    });
  }

  return res.status(200).end();
});

app.listen(4003, () => {
  console.log('Listening on PORT 4003');
});
