import React from 'react';

function Loading({ message = 'Loading...' }) {
  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '30px',
      textAlign: 'center'
    }}>
      <div style={{
        width: '40px',
        height: '40px',
        border: '3px solid rgba(123, 104, 238, 0.2)',
        borderTop: '3px solid var(--accent)',
        borderRadius: '50%',
        animation: 'spin 1s linear infinite',
        marginBottom: '15px'
      }}></div>
      <p>{message}</p>
    </div>
  );
}

export default Loading; 