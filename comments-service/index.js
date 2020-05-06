const cors = require('cors');
const express = require('express');
const { randomBytes } = require('crypto');

const app = express();

const commentsByPostId = {};

app.use(express.json());
app.use(cors());

app.get('/posts/:id/comments', (req, res) => {
  res.send(commentsByPostId[req.params.id] || []);
});

app.post('/posts/:id/comments', (req, res) => {
  const commentId = randomBytes(4).toString('hex');

  const { comment } = req.body;

  comments = commentsByPostId[req.params.id] || [];

  comments.push({
    id: commentId,
    comment,
    postId: req.params.id,
    timestamp: new Date(),
  });

  commentsByPostId[req.params.id] = comments;

  res.status(200).send(commentsByPostId[req.params.id]);
});

app.listen(4001, () => {
  console.log('listening at 4001');
});
