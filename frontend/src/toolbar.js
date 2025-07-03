// toolbar.js

import { DraggableNode } from "./draggableNode";

export const PipelineToolbar = () => {
  return (
    <div style={{ padding: "10px" }}>
      <div
        style={{
          marginTop: "20px",
          display: "flex",
          flexWrap: "wrap",
          gap: "10px",
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
