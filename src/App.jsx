import { SnackbarProvider } from "notistack";
import React, { useState } from "react";

import MovementNode from "./MovementNode";
import NewSession from "./NewSession";

function App() {
  const [context, setContext] = useState(null);

  return (
    <SnackbarProvider maxSnack={3}>
      {context ? <MovementNode /> : <NewSession setContext={setContext} />}
    </SnackbarProvider>
  );
}

export default App;
