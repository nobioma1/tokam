import React from 'react';
import { ThemeProvider, CSSReset, Box, Text } from '@chakra-ui/core';

import PostCreate from './PostCreate';
import { customTheme } from '../theme';
import Header from './Header';

const App = () => {
  return (
    <ThemeProvider theme={customTheme}>
      <CSSReset />
      <Box maxW="xl" margin="0 auto" px={1}>
        <Header />
        <PostCreate />
      </Box>
    </ThemeProvider>
  );
};

export default App;
