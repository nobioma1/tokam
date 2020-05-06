import axios from 'axios';
import { Box, Text, List, ListItem, ListIcon, Flex } from '@chakra-ui/core';
import React, { useEffect, useState } from 'react';
import moment from 'moment';

import config from '../config';

const CommentList = ({ postId }) => {
  const [comments, setComments] = useState([]);

  const fetchComments = async () => {
    const res = await axios.get(
      `${config.url.comments}/posts/${postId}/comments`
    );

    setComments(res.data);
  };

  useEffect(() => {
    fetchComments();
  }, []);

  const renderedPosts = Object.values(comments);

  return (
    <Box>
      <Text fontSize="md">Comments</Text>
      <List spacing={2}>
        {renderedPosts.map((item) => (
          <ListItem
            key={item.id}
            p={2}
            borderWidth="1px"
            borderColor="gray"
            rounded="md"
          >
            <Flex alignItems="center">
              <ListIcon icon="chat" color="gray" />
              <Text>{item.comment}</Text>
            </Flex>
            <Text fontSize="xs">{moment(item.timestamp).fromNow()}</Text>
          </ListItem>
        ))}
      </List>
    </Box>
  );
};

export default CommentList;
