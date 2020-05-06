import axios from 'axios';
import { Box, Text, Input, Button, Stack, FormLabel } from '@chakra-ui/core';
import React, { useState } from 'react';

const URL = 'http://localhost:4000/posts';

const PostCreate = () => {
  const [title, setTitle] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    const res = await axios.post(URL, {
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
          <FormLabel fontSize="3xl" isRequired>
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
