// frontend/src/submit.js

import React from "react";
import { useStore } from "./store"; // Import useStore to access nodes and edges
import { shallow } from "zustand/shallow"; // For efficient state selection

// Selector to get nodes and edges from the Zustand store
const selector = (state) => ({
  nodes: state.nodes,
  edges: state.edges,
});

export const SubmitButton = () => {
  // Use the selector to get the current nodes and edges from the store
  const { nodes, edges } = useStore(selector, shallow);

  const handleSubmit = async () => {
    // 1. Prepare the data to be sent to the backend
    // It's good practice to send only necessary data, not React Flow's internal props
    const payloadNodes = nodes.map((node) => ({
      id: node.id,
      type: node.type,
      data: node.data,
    }));

    const payloadEdges = edges.map((edge) => ({
      id: edge.id,
      source: edge.source,
      target: edge.target,
      sourceHandle: edge.sourceHandle,
      targetHandle: edge.targetHandle,
    }));

    const pipelineData = {
      nodes: payloadNodes,
      edges: payloadEdges,
    };

    console.log("Sending pipeline data:", pipelineData);

    try {
      // 2. Send the data to the backend
      const response = await fetch("http://localhost:8000/pipelines/parse", {
        // Ensure this URL matches your backend
        method: "POST", // Use POST as we are sending data
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(pipelineData), // Convert the JavaScript object to a JSON string
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      // 3. Parse the response from the backend
      const result = await response.json();
      console.log("Backend response:", result);

      // 4. Display an alert with the results
      alert(
        `Pipeline Analysis Result:\n` +
          `Number of Nodes: ${result.num_nodes}\n` +
          `Number of Edges: ${result.num_edges}\n` +
          `Is DAG: ${result.is_dag ? "Yes" : "No"}`
      );
    } catch (error) {
      console.error("Error submitting pipeline:", error);
      alert(
        `Failed to submit pipeline: ${error.message}. Please check console for details.`
      );
    }
  };

  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "20px",
        backgroundColor: "#ffffff",
        borderTop: "1px solid #e0e0e0",
        boxShadow: "0 -2px 10px rgba(0,0,0,0.05)",
        zIndex: 100,
      }}
    >
      <button
        // Changed type to "button" so it doesn't trigger a form submission (which would reload the page)
        type="button"
        onClick={handleSubmit} // Add the click handler
        style={{
          padding: "12px 25px",
          backgroundColor: "#4CAF50",
          color: "#ffffff",
          border: "none",
          borderRadius: "6px",
          fontSize: "16px",
          fontWeight: "600",
          cursor: "pointer",
          boxShadow: "0 4px 8px rgba(0,0,0,0.1)",
          transition:
            "background-color 0.2s ease-in-out, transform 0.1s ease-in-out",
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.backgroundColor = "#45a049";
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.backgroundColor = "#4CAF50";
        }}
        onMouseDown={(e) => {
          e.currentTarget.style.transform = "scale(0.98)";
        }}
        onMouseUp={(e) => {
          e.currentTarget.style.transform = "scale(1)";
        }}
      >
        Submit Pipeline
      </button>
    </div>
  );
};
