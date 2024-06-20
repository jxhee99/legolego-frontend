// Modal.js
import React from 'react';
import styles from './ListModal.module.css';

const ListModal = ({ isVisible, closeModal, title, children }) => {
  if (!isVisible) return null;

  return (
    <div className={styles.Modal}>
      <div className={styles.modal_layout}>
        <button className={styles.modal_close_button} onClick={closeModal}>
          x
        </button>
        <div className={styles.modal_title}>
          <h3>{title}</h3>
        </div>
        {children}
      </div>
    </div>
  );
};

export default ListModal;
