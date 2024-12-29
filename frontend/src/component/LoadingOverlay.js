import React from "react";
import "./LoadingOverlay.css";

const LoadingOverlay = ({ loading }) => {
  if (!loading) return null; // Do not render if loading is false

  return (
    <div className="loading-overlay">
      <div className="spinner"></div>
    </div>
  );
};

export default LoadingOverlay;
