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
          onInput={adjustTextareaHeight} 
          className="nodrag" 
          rows={1} 
          style={{
            minWidth: "180px", 
            minHeight: "40px", 
            resize: "none", 
            overflowY: "hidden", 
            padding: "8px 10px",
            border: "1px solid #d1d5db",
            borderRadius: "4px",
            fontSize: "14px",
            fontFamily: "inherit", 
            color: "#333",
            backgroundColor: "#f8f8f8", 
            boxSizing: "border-box", 
          }}
        />
      </label>
    </BaseNode>
  );
};
