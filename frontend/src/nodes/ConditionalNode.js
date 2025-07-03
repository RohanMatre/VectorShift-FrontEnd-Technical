// ConditionalNode.js

import React from "react";
import { Position } from "reactflow";
import { BaseNode } from "./BaseNode";

export const ConditionalNode = ({ id, data }) => {
  const conditionalHandles = [
    { type: "target", position: Position.Left, id: "conditionInput" },
    {
      type: "source",
      position: Position.Right,
      id: "trueOutput",
      style: { top: "35%" },
    },
    {
      type: "source",
      position: Position.Right,
      id: "falseOutput",
      style: { top: "65%" },
    },
  ];

  return (
    <BaseNode id={id} title="Conditional Logic" handles={conditionalHandles}>
      <div style={{ textAlign: "center", color: "#555" }}>
        <span>If condition is met, go True, else False.</span>
      </div>
    </BaseNode>
  );
};
