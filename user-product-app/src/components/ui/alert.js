import React from 'react';

const Alert = ({ message, onClose }) => {
  return (
    <div style={{ border: '1px solid red', padding: '10px', marginBottom: '10px' }}>
      <span>{message}</span>
      <button onClick={onClose} style={{ marginLeft: '10px' }}>Close</button>
    </div>
  );
};

export default Alert;
