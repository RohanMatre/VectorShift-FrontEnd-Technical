// APINode.js

import React from "react";
import { Position } from "reactflow";
import { BaseNode } from "./BaseNode";

export const APINode = ({ id, data }) => {
  const apiHandles = [
    { type: "target", position: Position.Left, id: "request" },
    {
      type: "source",
      position: Position.Right,
      id: "response",
      style: { top: "35%" },
    },
    {
      type: "source",
      position: Position.Right,
      id: "error",
      style: { top: "65%" },
    },
  ];

  return (
    <BaseNode id={id} title="API Call" handles={apiHandles}>
      <div style={{ textAlign: "center", color: "#555" }}>
        <span>Makes an HTTP request to an external API.</span>
      </div>
    </BaseNode>
  );
};
