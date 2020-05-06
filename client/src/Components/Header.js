import React from 'react';
import { Flex, Icon, Text } from '@chakra-ui/core';

const Header = () => {
  return (
    <Flex alignItems="center" py={3}>
      <Icon name="spinner" mr={2} />
      <Text fontSize="2xl" fontWeight="bold">
        TokAm
      </Text>
    </Flex>
  );
};

export default Header;
