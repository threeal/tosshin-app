import { Fade } from "@material-ui/core";
import { SnackbarProvider } from "notistack";
import React, { useState } from "react";

import MovementNode from "./MovementNode";
import NewSession from "./NewSession";

function App() {
  const [context, setContext] = useState(null);

  return (
    <SnackbarProvider maxSnack={3}>
      <Fade in={context}>
        <div>
          <MovementNode />
        </div>
      </Fade>
      <Fade in={!context}>
        <div>
          <NewSession setContext={setContext} />
        </div>
      </Fade>
    </SnackbarProvider>
  );
}

export default App;
