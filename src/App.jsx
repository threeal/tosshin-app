import React from "react";

import MovementNode from "./MovementNode";
import NewSession from "./NewSession";

function App() {
  const [context, setContext] = React.useState(null);

  return context ? <MovementNode /> : <NewSession setContext={setContext} />;
}

export default App;
