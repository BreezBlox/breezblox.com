import React from 'react';

function Header() {
  return (
    <header>
      <div className="logo">
        <div className="prism-icons">
          <div className="prism-icon"></div>
          <div className="prism-icon"></div>
          <div className="prism-icon"></div>
        </div>
        <div className="logo-container">
          <h1>PRISM<span>.beta</span></h1>
          <div className="logo-tagline">Production Root Issue Sorting Mechanism</div>
        </div>
      </div>
      <div className="user-controls">
        <button className="primary">Export Data</button>
        <button className="danger">Clear Data</button>
      </div>
    </header>
  );
}

export default Header; 