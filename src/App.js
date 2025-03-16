import React, { useState } from 'react';
import './styles/main.css';
import Header from './components/Header';
import IssueSubmission from './components/IssueSubmission';
import RootSourceAnalysis from './components/RootSourceAnalysis';
import Welcome from './components/Welcome';
import Footer from './components/Footer';

function App() {
  const [showWelcome, setShowWelcome] = useState(true);
  
  return (
    <div className="container">
      <Header />
      
      <div className="main-content">
        <IssueSubmission />
        <RootSourceAnalysis />
      </div>
      
      {showWelcome && <Welcome onClose={() => setShowWelcome(false)} />}
      
      <Footer />
    </div>
  );
}

export default App; 