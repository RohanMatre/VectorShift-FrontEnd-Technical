// textNode.js

import React, { useState, useEffect, useRef, useCallback } from "react";
import { Position } from "reactflow";
import { BaseNode } from "./BaseNode"; // Import the BaseNode component

// Utility to debounce a function
const debounce = (func, delay) => {
  let timeout;
  return function (...args) {
    const context = this;
    clearTimeout(timeout);
    timeout = setTimeout(() => func.apply(context, args), delay);
  };
};

export const TextNode = ({ id, data, selected }) => {
  const [currText, setCurrText] = useState(data?.text || "");
  const [dynamicInputHandles, setDynamicInputHandles] = useState([]);
  const textareaRef = useRef(null);

  // Function to resize textarea based on its content
  const adjustTextareaHeight = useCallback(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto"; // Reset height to recalculate
      textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
    }
  }, []);

  // Function to extract valid variable names from text
  const extractAndValidateVariables = useCallback((text) => {
    // Regex to find {{ variableName }} where variableName is a valid JS identifier
    // (starts with letter, underscore, or dollar sign, followed by alphanumeric or _)
    const regex = /\{\{\s*([a-zA-Z_$][a-zA-Z0-9_$]*)\s*\}\}/g;
    const matches = [...text.matchAll(regex)];

    const uniqueVariables = new Set();
    matches.forEach((match) => {
      if (match[1]) {
        // Ensure the captured group exists
        uniqueVariables.add(match[1]);
      }
    });

    // Convert set to array of handle objects
    return Array.from(uniqueVariables).map((varName) => ({
      type: "target",
      position: Position.Left,
      id: varName,
      // You can add a label if you want the variable name displayed on the handle
      // label: varName,
    }));
  }, []);

  // Effect to run on initial mount and when currText changes
  useEffect(() => {
    adjustTextareaHeight();
    const newHandles = extractAndValidateVariables(currText);
    // Only update state if handles have actually changed to prevent unnecessary re-renders
    if (JSON.stringify(newHandles) !== JSON.stringify(dynamicInputHandles)) {
      setDynamicInputHandles(newHandles);
    }
  }, [
    currText,
    adjustTextareaHeight,
    extractAndValidateVariables,
    dynamicInputHandles,
  ]);

  // Debounced handler for text changes
  // eslint-disable-next-line
  const debouncedHandleTextChange = useCallback(
    debounce((value) => {
      setCurrText(value);
      // In a real app, you might also update the data prop for persistence here
      // updateNodeField(id, 'text', value); // Assuming updateNodeField is available from store
    }, 100),
    []
  ); // Debounce by 100ms

  const onTextareaChange = (e) => {
    debouncedHandleTextChange(e.target.value);
    // Immediate height adjustment for smoother typing experience
    adjustTextareaHeight();
  };

  // Define the fixed output handle
  const fixedOutputHandle = {
    type: "source",
    position: Position.Right,
    id: "output",
  };

  // Combine dynamic input handles with the fixed output handle
  const allHandles = [...dynamicInputHandles, fixedOutputHandle];

  return (
    <BaseNode id={id} title="Text" handles={allHandles} selected={selected}>
      {/* Unique content for the Text Node */}
      <label style={{ display: "flex", flexDirection: "column" }}>
        Text:
        <textarea
          ref={textareaRef}
          value={currText}
          onChange={onTextareaChange}
          onInput={adjustTextareaHeight} // Adjust height immediately on input
          className="nodrag" // Prevents dragging when interacting with textarea
          rows={1} // Start with one row
          style={{
            minWidth: "180px", // Minimum width for the textarea
            minHeight: "40px", // Minimum height for the textarea
            resize: "none", // Disable manual resize handle
            overflowY: "hidden", // Hide scrollbar if content fits
            padding: "8px 10px",
            border: "1px solid #d1d5db",
            borderRadius: "4px",
            fontSize: "14px",
            fontFamily: "inherit", // Inherit font from body/BaseNode
            color: "#333",
            backgroundColor: "#f8f8f8", // Light background for input
            boxSizing: "border-box", // Include padding and border in the element's total width and height
          }}
        />
      </label>
    </BaseNode>
  );
};
