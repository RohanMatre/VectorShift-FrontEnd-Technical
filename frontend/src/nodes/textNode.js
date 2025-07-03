// textNode.js

import React, { useState } from "react";
import { Position } from "reactflow";
import { BaseNode } from "./BaseNode"; // Import the BaseNode component

export const TextNode = ({ id, data }) => {
  const [currText, setCurrText] = useState(data?.text || "input");

  const handleTextChange = (e) => {
    setCurrText(e.target.value);
  };

  // Define the handles for this specific node
  const textHandles = [
    { type: "source", position: Position.Right, id: "output" },
  ];

  return (
    <BaseNode id={id} title="Text" handles={textHandles}>
      {/* Content unique to the Text Node */}
      <label>
        Text:
        <input
          type="text"
          value={currText}
          onChange={handleTextChange}
          className="nodrag"
          style={{
            width: "calc(100% - 42px)",
            padding: "4px",
            border: "1px solid #ccc",
            borderRadius: "3px",
          }}
        />
      </label>
    </BaseNode>
  );
};
