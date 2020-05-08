const axios = require('axios');
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

app.post('/posts/:id/comments', async (req, res) => {
  const commentId = randomBytes(4).toString('hex');

  const { comment } = req.body;

  comments = commentsByPostId[req.params.id] || [];

  const newComment = {
    id: commentId,
    comment,
    postId: req.params.id,
    status: 'pending',
    timestamp: new Date(),
  };

  commentsByPostId[req.params.id] = [...comments, newComment];

  await axios.post('http://event-bus-service:4005/events', {
    type: 'CommentCreated',
    data: {
      ...newComment,
    },
  });

  res.status(200).send(commentsByPostId[req.params.id]);
});

app.post('/events', async (req, res) => {
  const { type, data } = req.body;

  if (type === 'CommentModerated') {
    const { postId, id } = data;

    const comments = commentsByPostId[postId];

    const index = comments.findIndex((comment) => comment.id === id);

    comments[index] = data;

    await axios.post('http://event-bus-service:4005/events', {
      type: 'CommentUpdated',
      data,
    });
  }

  res.send({ status: 'OK' });
});

app.listen(4001, () => {
  console.log('listening at 4001');
});
