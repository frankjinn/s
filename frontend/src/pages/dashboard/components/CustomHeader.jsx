import React from 'react';

export default function CustomHeader({ userName, logoSrc }) {
  return (
    <header style={styles.header}>
      <img src={logoSrc} alt="Healthcare Provider Logo" style={styles.logo} />
      <h2 style={styles.welcomeMessage}>Welcome {userName}</h2>
    </header>
  );
}

// Basic inline styles for simplicity
const styles = {
  header: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    backgroundColor: '#f8f9fa',
    padding: '20px',
    boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
  },
  logo: {
    width: '120px',
    height: 'auto',
    marginBottom: '10px',
  },
  welcomeMessage: {
    fontSize: '18px',
    color: '#333',
  },
};