// MergeNode.js

import React from "react";
import { Position } from "reactflow";
import { BaseNode } from "./BaseNode";

export const MergeNode = ({ id, data }) => {
  const mergeHandles = [
    {
      type: "target",
      position: Position.Left,
      id: "input1",
      style: { top: "35%" },
    },
    {
      type: "target",
      position: Position.Left,
      id: "input2",
      style: { top: "65%" },
    },
    { type: "source", position: Position.Right, id: "output" },
  ];

  return (
    <BaseNode id={id} title="Merge Data" handles={mergeHandles}>
      <div style={{ textAlign: "center", color: "#555" }}>
        <span>Combines data from multiple inputs.</span>
      </div>
    </BaseNode>
  );
};
