const axios = require('axios');
const cors = require('cors');
const express = require('express');
const { randomBytes } = require('crypto');

const app = express();

const PORT = process.env.PORT || 4000;

const posts = {};

app.use(express.json());
app.use(cors());

app.get('/posts', (req, res) => {
  res.send(posts);
});

app.post('/posts', async (req, res) => {
  const id = randomBytes(4).toString('hex');

  const { title } = req.body;

  posts[id] = {
    id,
    title,
    timestamp: new Date(),
  };

  await axios.post('http://localhost:4005/events', {
    type: 'PostCreated',
    data: {
      ...posts[id],
    },
  });

  res.status(201).send(posts[id]);
});

app.post('/events', (req, res) => {
  console.log(req.body);

  res.send({ status: 'OK' });
});

app.listen(PORT, () => {
  console.log(`POSTS-SERVICE -> listening on ${PORT}`);
});
