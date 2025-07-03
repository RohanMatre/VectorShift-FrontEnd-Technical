// BaseNode.js

import React from "react";
import { Handle } from "reactflow";

const defaultNodeStyle = {
  width: 200,
  minHeight: 80, // Use minHeight to allow content to expand vertically
  border: "1px solid black",
  borderRadius: "5px", // Added a subtle border-radius for better aesthetics
  backgroundColor: "#fff",
  boxShadow: "0 2px 10px rgba(0,0,0,0.1)", // Added a subtle shadow
  padding: "10px",
  display: "flex",
  flexDirection: "column",
  justifyContent: "space-between",
  fontFamily: "sans-serif",
  fontSize: "14px",
};

// Create a BaseNode Component which takes id, title, children, handles for renders the common wrapper for all Nodes
export const BaseNode = ({ id, title, children, handles = [] }) => {
  return (
    // 1. div1 - Node Outer body
    <div style={defaultNodeStyle}>
      {/* 2. div2 - Title */}
      <div style={{ fontWeight: "bold", marginBottom: "8px", color: "#333" }}>
        {title}
      </div>

      {/* 3. div3 - Unique Node Content */}
      <div style={{ flexGrow: 1, marginBottom: "8px" }}>{children}</div>

      {/* 4. Handle - Render Handles dynamically  */}
      {handles.map((handleProps, index) => (
        <Handle
          key={`${id}-${handleProps.id || index}`}
          id={handleProps.id}
          {...handleProps}
        />
      ))}
    </div>
  );
};
