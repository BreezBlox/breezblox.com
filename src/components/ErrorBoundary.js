import React, { Component } from 'react';

class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { 
      hasError: false,
      error: null,
      errorInfo: null
    };
  }

  static getDerivedStateFromError(error) {
    // Update state so the next render will show the fallback UI
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    // Log the error to an error reporting service
    console.error('Error caught by ErrorBoundary:', error, errorInfo);
    this.setState({
      error: error,
      errorInfo: errorInfo
    });
  }

  render() {
    if (this.state.hasError) {
      // You can render any custom fallback UI
      return (
        <div className="card" style={{ margin: '20px auto', maxWidth: '600px' }}>
          <h2 className="card-title">Something went wrong</h2>
          <div className="error-message">
            An error occurred in the application. Please try refreshing the page.
          </div>
          
          <details style={{ 
            marginTop: '20px', 
            padding: '10px', 
            backgroundColor: 'rgba(0,0,0,0.1)',
            borderRadius: '4px'
          }}>
            <summary>Error details (for developers)</summary>
            <pre style={{ 
              overflow: 'auto', 
              padding: '10px', 
              fontSize: '12px',
              color: 'var(--text-secondary)'
            }}>
              {this.state.error && this.state.error.toString()}
              <br />
              {this.state.errorInfo && this.state.errorInfo.componentStack}
            </pre>
          </details>
          
          <button 
            className="primary" 
            style={{ marginTop: '20px' }}
            onClick={() => window.location.reload()}
          >
            Refresh Page
          </button>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary; 