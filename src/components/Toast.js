import React, { useEffect, useState } from 'react';

/**
 * Toast notification component for displaying messages
 * 
 * @param {Object} props Component props
 * @param {string} props.message Message to display
 * @param {string} props.type Type of toast (success, error, warning)
 * @param {number} props.duration Duration in milliseconds
 * @param {Function} props.onClose Function to call when toast is closed
 */
function Toast({ message, type = 'success', duration = 3000, onClose }) {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(false);
      setTimeout(() => {
        onClose();
      }, 300); // Wait for hide animation to complete
    }, duration);

    return () => clearTimeout(timer);
  }, [duration, onClose]);

  return (
    <div className={`toast ${type} ${!isVisible ? 'hide' : ''}`}>
      {message}
    </div>
  );
}

/**
 * Toast container to manage multiple toasts
 */
export function ToastContainer() {
  const [toasts, setToasts] = useState([]);

  // Add a new toast
  const addToast = (message, type = 'success', duration = 3000) => {
    const id = Date.now();
    setToasts(prev => [...prev, { id, message, type, duration }]);
    return id;
  };

  // Remove a toast by id
  const removeToast = (id) => {
    setToasts(prev => prev.filter(toast => toast.id !== id));
  };

  // Global functions for easy access
  if (typeof window !== 'undefined') {
    window.showToast = addToast;
    window.removeToast = removeToast;
  }

  return (
    <div className="toast-container">
      {toasts.map(toast => (
        <Toast
          key={toast.id}
          message={toast.message}
          type={toast.type}
          duration={toast.duration}
          onClose={() => removeToast(toast.id)}
        />
      ))}
    </div>
  );
}

export default Toast; 