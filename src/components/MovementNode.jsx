import { BoxedCircularProgress, TitledCard, useNode } from "kumo-app";
import React from "react";

function MovementNode() {
  const node = useNode("movement_node");

  const Content = () => {
    if (node === null) {
      return <BoxedCircularProgress />;
    }

    return <div />;
  };

  return (
    <TitledCard title="Movement Node" raised>
      <Content />
    </TitledCard>
  );
}

export default MovementNode;
