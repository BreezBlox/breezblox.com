import React, { useState } from 'react';
import './styles/main.css';
import Header from './components/Header';
import IssueSubmission from './components/IssueSubmission';
import RootSourceAnalysis from './components/RootSourceAnalysis';
import Welcome from './components/Welcome';
import Footer from './components/Footer';
import ErrorBoundary from './components/ErrorBoundary';
import { IssueProvider } from './context/IssueContext';
import { ToastContainer } from './components/Toast';

function App() {
  const [showWelcome, setShowWelcome] = useState(() => {
    // Check if the welcome message has been seen before
    return sessionStorage.getItem('prism_welcome_seen') !== 'true';
  });
  
  const handleCloseWelcome = () => {
    setShowWelcome(false);
    // Set flag in session storage so welcome doesn't show on refresh
    sessionStorage.setItem('prism_welcome_seen', 'true');
  };
  
  return (
    <ErrorBoundary>
      <IssueProvider>
        <div className="container">
          <Header />
          
          <div className="main-content">
            <ErrorBoundary>
              <IssueSubmission />
            </ErrorBoundary>
            <ErrorBoundary>
              <RootSourceAnalysis />
            </ErrorBoundary>
          </div>
          
          {showWelcome && <Welcome onClose={handleCloseWelcome} />}
          
          <Footer />
          
          {/* Toast notification container */}
          <ToastContainer />
        </div>
      </IssueProvider>
    </ErrorBoundary>
  );
}

export default App; 