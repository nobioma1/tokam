const express = require('express');
const cors = require('cors');

const app = express();

app.use(cors());
app.use(express.json());

const posts = {};

app.get('/posts', (req, res) => {
  res.send(posts);
});

app.post('/events', (req, res) => {
  const { type, data } = req.body;

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
    const { id, comment, postId, timestamp } = data;
    const post = posts[postId];
    post.comments.push({
      id,
      comment,
      postId,
      timestamp,
    });
  }
  return res.status(200).end();
});

app.listen(4002, () => {
  console.log('Listening on PORT 4002');
});
