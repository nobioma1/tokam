import axios from 'axios';
import { Box, Input, Button, Stack } from '@chakra-ui/core';
import React, { useState } from 'react';

import config from '../config';

const CommentCreate = ({ postId }) => {
  const [comment, setComment] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    const res = await axios.post(`${config.url}/posts/${postId}/comments`, {
      comment,
    });

    console.log(res);

    if (res.data) {
      setComment('');
    }
  };

  return (
    <Box>
      <form onSubmit={handleSubmit}>
        <Stack py={2}>
          <Input
            name="comment"
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            placeholder="New Comment"
            _focus={{ outline: 'none' }}
            isRequired
          />
          <Button type="submit" size="sm" variant="solid" variantColor="blue">
            Add Comment
          </Button>
        </Stack>
      </form>
    </Box>
  );
};

export default CommentCreate;
