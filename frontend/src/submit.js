// submit.js

export const SubmitButton = () => {
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
        type="submit"
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
