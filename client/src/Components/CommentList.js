import { Box, Text, List, ListItem, ListIcon, Flex } from '@chakra-ui/core';
import React from 'react';
import moment from 'moment';

const CommentList = ({ comments }) => {
  return (
    <Box>
      <Text fontSize="md">Comments</Text>
      <List spacing={2}>
        {comments.map((item) => (
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
