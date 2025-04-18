// XPProgressBar.jsx
import React from 'react';

const XPProgressBar = ({ current, max }) => {
  const percentage = Math.min((current / max) * 100, 100);

  return (
    <div className="w-full bg-gray-200 rounded-full h-3 overflow-hidden">
      <div
        className="h-full bg-green-500 transition-all duration-500"
        style={{ width: `${percentage}%` }}
      ></div>
    </div>
  );
};

export default XPProgressBar;
