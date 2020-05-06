import React from 'react';
import { ThemeProvider, CSSReset, Box, Divider } from '@chakra-ui/core';

import { customTheme } from '../theme';
import Header from './Header';
import PostCreate from './PostCreate';
import PostList from './PostList';

const App = () => {
  return (
    <ThemeProvider theme={customTheme}>
      <CSSReset />
      <Box maxW="xl" margin="0 auto" px={1}>
        <Header />
        <PostCreate />
        <Divider />
        <PostList />
      </Box>
    </ThemeProvider>
  );
};

export default App;
