import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/NotFound.css';

const NotFound = () => {
  return (
    <div className="not-found-container">
      <div className="not-found-content">
        <div className="glitch-container">
          <h1 className="glitch-text" data-text="404">404</h1>
        </div>
        <h2>Page Not Found</h2>
        <p>Oops! The page you're looking for doesn't exist or has been moved.</p>
        <div className="not-found-actions">
          <Link to="/" className="btn btn-primary">
            Back to Home
          </Link>
          <Link to="/contact" className="btn btn-outline">
            Contact Me
          </Link>
        </div>
      </div>
    </div>
  );
};

export default NotFound; 