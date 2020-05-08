import axios from 'axios';
import { Box, Input, Button, Stack, FormLabel } from '@chakra-ui/core';
import React, { useState } from 'react';

import config from '../config';

const PostCreate = () => {
  const [title, setTitle] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    const res = await axios.post(`${config.url}/posts/create`, {
      title,
    });

    if (res.data) {
      setTitle('');
    }
  };

  return (
    <Box>
      <form onSubmit={handleSubmit}>
        <Stack py={2}>
          <FormLabel htmlFor="title" fontSize="3xl" isRequired>
            What do you wanna tell us?
          </FormLabel>
          <Input
            name="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="I wanna be free and live without warning, I wanna finally see..."
            size="lg"
            isRequired
          />
          <Button type="submit" variant="outline" variantColor="blue">
            Post
          </Button>
        </Stack>
      </form>
    </Box>
  );
};

export default PostCreate;
