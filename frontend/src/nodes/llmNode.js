// llmNode.js

import React from "react";
import { Position } from "reactflow";
import { BaseNode } from "./BaseNode"; // Import the BaseNode component
export const LLMNode = ({ id, data }) => {
  // Define the handles for this specific node, including custom positions
  const llmHandles = [
    {
      type: "target",
      position: Position.Left,
      id: "system",
      style: { top: "33.33%" },
    },
    {
      type: "target",
      position: Position.Left,
      id: "prompt",
      style: { top: "66.66%" },
    },
    { type: "source", position: Position.Right, id: "response" },
  ];

  return (
    <BaseNode id={id} title="LLM" handles={llmHandles}>
      {/* Content unique to the LLM Node */}
      <div style={{ textAlign: "center", color: "#555" }}>
        <span>This is a Large Language Model.</span>
      </div>
    </BaseNode>
  );
};
