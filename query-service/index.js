const axios = require('axios');
const express = require('express');
const cors = require('cors');

const app = express();

app.use(cors());
app.use(express.json());

const posts = {};

function handleEvent(type, data) {
  if (type === 'PostCreated') {
    const { id, title, timestamp } = data;
    posts[id] = {
      id,
      title,
      comments: [],
      timestamp,
    };
  }

  if (type === 'CommentCreated') {
    const { id, comment, postId, status, timestamp } = data;
    const post = posts[postId];
    post.comments.push({
      id,
      comment,
      postId,
      status,
      timestamp,
    });
  }

  if (type === 'CommentUpdated') {
    const { id, postId } = data;

    const post = posts[postId];
    const index = post.comments.findIndex((comment) => comment.id === id);

    post.comments[index] = data;
  }
}

app.get('/posts', (req, res) => {
  res.send(posts);
});

app.post('/events', (req, res) => {
  const { type, data } = req.body;

  handleEvent(type, data);

  return res.status(200).end();
});

app.listen(4002, async () => {
  console.log('Listening on PORT 4002');

  const res = await axios.get('http://localhost:4005/events');

  for (event of res.data) {
    console.log(`Handling event "${event.type}"`);
    handleEvent(event.type, event.data);
  }
});
