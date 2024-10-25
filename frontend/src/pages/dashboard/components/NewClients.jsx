import React from 'react';

export default function NewClients({ clients }) {
  return (
    <div style={styles.newClients}>
      <h3>New Clients for Today</h3>
      <ul>
        {clients.map((client, index) => (
          <li key={index} style={styles.clientItem}>{client}</li>
        ))}
      </ul>
    </div>
  );
}

// Inline styles for simplicity
const styles = {
  newClients: {
    flex: 1,
    backgroundColor: '#fff',
    padding: '20px',
    borderRadius: '8px',
    boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
  },
  clientItem: {
    backgroundColor: '#e9ecef',
    padding: '8px',
    margin: '5px 0',
    borderRadius: '4px',
  },
};