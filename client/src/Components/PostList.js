import axios from 'axios';
import { Box, Text, Stack } from '@chakra-ui/core';
import React, { useEffect, useState } from 'react';
import moment from 'moment';

import config from '../config';
import CommentCreate from './CommentCreate';
import CommentList from './CommentList';

const PostList = () => {
  const [posts, setPosts] = useState({});

  const fetchPosts = async () => {
    const res = await axios.get(`${config.url.query}/posts`);

    setPosts(res.data);
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  const renderedPosts = Object.values(posts);

  return (
    <Box>
      <Text fontSize="2xl">Yarns</Text>
      <Stack my={1}>
        {renderedPosts.map((post) => (
          <Box
            key={post.id}
            p={2}
            borderWidth="1px"
            borderColor="gray"
            rounded="md"
          >
            <Box>
              <Text fontSize="lg">{post.title}</Text>
              <Text fontSize="xs">{moment(post.timestamp).fromNow()}</Text>
            </Box>
            <CommentCreate postId={post.id} />
            <CommentList comments={post.comments} />
          </Box>
        ))}
      </Stack>
    </Box>
  );
};

export default PostList;
