// ImageNode.js

import React from "react";
import { Position } from "reactflow";
import { BaseNode } from "./BaseNode"; // Import BaseNode Component
export const ImageNode = ({ id, data }) => {
  const imageHandles = [
    { type: "target", position: Position.Left, id: "inputImage" },
    { type: "source", position: Position.Right, id: "outputImage" },
  ];

  return (
    <BaseNode id={id} title="Image Processor" handles={imageHandles}>
      <div style={{ textAlign: "center", color: "#555" }}>
        <span>Processes images (e.g., resize, filter).</span>
      </div>
    </BaseNode>
  );
};
