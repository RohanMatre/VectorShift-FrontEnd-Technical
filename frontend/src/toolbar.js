// toolbar.js

import { DraggableNode } from "./draggableNode";

export const PipelineToolbar = () => {
  return (
    <div
      style={{
        padding: "15px 20px",
        backgroundColor: "#ffffff",
        borderBottom: "1px solid #e0e0e0",
        boxShadow: "0 2px 10px rgba(0,0,0,0.05)",
        zIndex: 100,
      }}
    >
      <h3 style={{ margin: "0 0 15px 0", color: "#4a4a4a", fontSize: "18px" }}>
        Draggable Nodes
      </h3>
      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          gap: "12px",
          justifyContent: "flex-start",
        }}
      >
        <DraggableNode type="customInput" label="Input" />
        <DraggableNode type="llm" label="LLM" />
        <DraggableNode type="customOutput" label="Output" />
        <DraggableNode type="text" label="Text" />
        {/* ADD NEW DRAGGABLE NODES */}
        <DraggableNode type="image" label="Image" />
        <DraggableNode type="conditional" label="Conditional" />
        <DraggableNode type="database" label="Database" />
        <DraggableNode type="api" label="API" />
        <DraggableNode type="merge" label="Merge" />
      </div>
    </div>
  );
};
