// DatabaseNode.js

import React from "react";
import { Position } from "reactflow";
import { BaseNode } from "./BaseNode";

export const DatabaseNode = ({ id, data }) => {
  const dbHandles = [
    { type: "target", position: Position.Left, id: "query" },
    { type: "source", position: Position.Right, id: "result" },
  ];

  return (
    <BaseNode id={id} title="Database Query" handles={dbHandles}>
      <div style={{ textAlign: "center", color: "#555" }}>
        <span>Connects to a database and runs queries.</span>
      </div>
    </BaseNode>
  );
};
