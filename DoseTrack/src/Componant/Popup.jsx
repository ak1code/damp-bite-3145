
import React from 'react';
import styles from './Popup.module.css';

const Popup = ({ message, onClose,onStop }) => {

  const handleClose = () => {
    onStop(); 
    onClose(); 
  };
  return (
    <div className={styles.overlay}>
      <div className={styles.popup}>
        <p>{message}</p>
        <button onClick={handleClose}>Close</button>
      </div>
    </div>
  );
};

export default Popup;
