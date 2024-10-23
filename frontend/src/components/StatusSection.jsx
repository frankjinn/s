import React from 'react';

export default function StatusSection({ verifiedCount, needAttentionCount }) {
  return (
    <div style={styles.statusSection}>
      <div style={styles.statusItem}>
        <h3>Verified:</h3>
        <p>{verifiedCount}</p>
      </div>
      <div style={styles.statusItem}>
        <h3>Need Attention:</h3>
        <p>{needAttentionCount}</p>
      </div>
    </div>
  );
}

// Inline styles for simplicity
const styles = {
  statusSection: {
    flex: 1,
    backgroundColor: '#fff',
    padding: '20px',
    borderRadius: '8px',
    boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
    display: 'flex',
    flexDirection: 'column',
    gap: '20px',
  },
  statusItem: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#e9ecef',
    padding: '10px',
    borderRadius: '4px',
  },
};