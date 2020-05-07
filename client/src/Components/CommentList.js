import { Box, Text, List, ListItem, ListIcon, Flex } from '@chakra-ui/core';
import React from 'react';
import moment from 'moment';

const CommentList = ({ comments }) => {
  const renderedComments = comments.map((commentItem) => {
    let display;

    switch (commentItem.status) {
      case 'approved':
        display = (
          <Flex alignItems="center">
            <ListIcon icon="chat" color="gray.500" />
            <Text>{commentItem.comment}</Text>
          </Flex>
        );
        break;
      case 'rejected':
        display = (
          <Flex alignItems="center">
            <ListIcon icon="not-allowed" color="red.300" />
            <Text color="red.300" fontSize="sm">
              Comment has been rejected
            </Text>
          </Flex>
        );
        break;
      default:
        display = (
          <Flex alignItems="center">
            <ListIcon icon="time" color="teal.300" />
            <Text fontSize="sm">Comment is awaiting moderation</Text>
          </Flex>
        );
        break;
    }

    return (
      <ListItem
        key={commentItem.id}
        p={2}
        borderWidth="1px"
        borderColor="gray"
        rounded="md"
      >
        {display}
        <Text fontSize="xs">{moment(commentItem.timestamp).fromNow()}</Text>
      </ListItem>
    );
  });

  return (
    <Box>
      <Text fontSize="md">Comments</Text>
      <List spacing={2}>{renderedComments}</List>
    </Box>
  );
};

export default CommentList;
