import { Box, Container } from "@material-ui/core";
import { LoggerProvider, SessionProvider } from "kumo-app";
import React from "react";

import MovementNode from "./components/MovementNode";

function App() {
  return (
    <LoggerProvider>
      <SessionProvider>
        <Box margin={4}>
          <Container maxWidth="md">
            <MovementNode />
          </Container>
        </Box>
      </SessionProvider>
    </LoggerProvider>
  );
}

export default App;
