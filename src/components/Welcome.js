import React from 'react';

function Welcome({ onClose }) {
  return (
    <div className="tooltip">
      <button className="tooltip-close" onClick={onClose}>×</button>
      <h4>Welcome to PRISM.beta</h4>
      <p>This app helps identify and track production issues by department. Submit issues using the form, and our AI will automatically determine the root cause department. You can contest this classification if needed.</p>
    </div>
  );
}

export default Welcome; 