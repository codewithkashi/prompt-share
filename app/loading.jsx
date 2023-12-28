import React from "react";
import "@styles/animation.css";
const Loading = () => {
  return (
    <div className="animate-container">
      <div className="flex items-center justify-center h-full">
        <div className="progress-bar"></div>
      </div>
    </div>
  );
};

export default Loading;
