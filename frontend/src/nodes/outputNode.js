// outputNode.js

import React, { useState } from "react";
import { Position } from "reactflow";
import { BaseNode } from "./BaseNode"; // Import the BaseNode component

export const OutputNode = ({ id, data }) => {
  const [currName, setCurrName] = useState(
    data?.outputName || id.replace("customOutput-", "output_")
  );
  const [outputType, setOutputType] = useState(data.outputType || "Text");

  const handleNameChange = (e) => {
    setCurrName(e.target.value);
  };

  const handleTypeChange = (e) => {
    setOutputType(e.target.value);
  };

  // Define the handles for this specific node
  const outputHandles = [
    { type: "target", position: Position.Left, id: "value" },
  ];

  return (
    <BaseNode id={id} title="Output" handles={outputHandles}>
      {/* Content unique to the Output Node */}
      <div style={{ display: "flex", flexDirection: "column", gap: "5px" }}>
        <label>
          Name:
          <input
            type="text"
            value={currName}
            onChange={handleNameChange}
            className="nodrag"
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
            value={outputType}
            onChange={handleTypeChange}
            className="nodrag"
            style={{
              width: "calc(100% - 40px)",
              padding: "4px",
              border: "1px solid #ccc",
              borderRadius: "3px",
            }}
          >
            <option value="Text">Text</option>
            <option value="File">Image</option>
          </select>
        </label>
      </div>
    </BaseNode>
  );
};
