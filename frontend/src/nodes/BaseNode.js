// BaseNode.js

import React from "react";
import { Handle } from "reactflow";

const defaultNodeStyle = {
  width: 220,
  minHeight: 90,
  border: "1px solid #cad1d9",
  borderRadius: "8px",
  backgroundColor: "#ffffff",
  boxShadow: "0 4px 12px rgba(0,0,0,0.08)",
  padding: "12px 15px",
  display: "flex",
  flexDirection: "column",
  justifyContent: "space-between",
  fontFamily: "Inter, sans-serif",
  fontSize: "14px",
  color: "#333",
  transition: "box-shadow 0.2s ease-in-out, border-color 0.2s ease-in-out",
};

// Styles for the node when it's selected
const selectedNodeStyle = {
  borderColor: "#6366f1",
  boxShadow: "0 6px 16px rgba(99, 102, 241, 0.3)",
};

// Create a BaseNode Component which takes id, title, children, handles for renders the common wrapper for all Nodes
export const BaseNode = ({ id, title, children, handles = [], selected }) => {
  // Apply selected style if the node is selected
  const nodeStyles = selected
    ? { ...defaultNodeStyle, ...selectedNodeStyle }
    : defaultNodeStyle;

  return (
    // 1. div1 - Node Outer body
    <div style={nodeStyles}>
      {/* 2. div2 - Title */}
      <div
        style={{
          fontWeight: "600",
          marginBottom: "10px",
          color: "#1a1a1a",
          fontSize: "15px",
        }}
      >
        {title}
      </div>

      {/* 3. div3 - Unique Node Content */}
      <div
        style={{
          flexGrow: 1,
          marginBottom: "10px",
          fontSize: "13px",
          color: "#555",
        }}
      >
        {children}
      </div>

      {/* 4. Handle - Render Handles dynamically  */}
      {handles.map((handleProps, index) => (
        <Handle
          key={`${id}-${handleProps.id || index}`}
          id={handleProps.id}
          style={{
            width: "12px",
            height: "12px",
            backgroundColor: "#a0a0a0",
            border: "2px solid #ffffff",
            ...handleProps.style,
          }}
          {...handleProps}
        />
      ))}
    </div>
  );
};
