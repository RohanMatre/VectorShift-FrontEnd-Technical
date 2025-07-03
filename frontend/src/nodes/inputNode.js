// inputNode.js

import React, { useState } from "react";
import { Position } from "reactflow";
import { BaseNode } from "./BaseNode"; // Import BaseNode Component

export const InputNode = ({ id, data }) => {
  const [currName, setCurrName] = useState(
    data?.inputName || id.replace("customInput-", "input_")
  );
  const [inputType, setInputType] = useState(data.inputType || "Text");

  const handleNameChange = (e) => {
    setCurrName(e.target.value);
  };

  const handleTypeChange = (e) => {
    setInputType(e.target.value);
  };

  // Define the handles for this specific node
  const inputHandles = [
    { type: "source", position: Position.Right, id: "value" },
  ];

  return (
    <BaseNode id={id} title="Input" handles={inputHandles}>
      {/* Content unique to the Input Node */}
      <div style={{ display: "flex", flexDirection: "column", gap: "5px" }}>
        <label>
          Name:
          <input
            type="text"
            value={currName}
            onChange={handleNameChange}
            className="nodrag" // Prevents dragging when interacting with input
            style={{
              width: "calc(100% - 57px)",
              padding: "4px",
              border: "1px solid #ccc",
              borderRadius: "3px",
            }}
          />
        </label>
        <label>
          Type:
          <select
            value={inputType}
            onChange={handleTypeChange}
            className="nodrag" // Prevents dragging when interacting with select
            style={{
              width: "calc(100% - 40px)",
              padding: "4px",
              border: "1px solid #ccc",
              borderRadius: "3px",
            }}
          >
            <option value="Text">Text</option>
            <option value="File">File</option>
          </select>
        </label>
      </div>
    </BaseNode>
  );
};
