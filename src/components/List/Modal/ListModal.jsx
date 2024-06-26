// Modal.js
import React from 'react';
import styles from './ListModal.module.css';

const ListModal = ({ isVisible, closeModal, title, children }) => {
  if (!isVisible) return null;

  const handleBackgroundClick = (event) => {
    // 모달 바깥쪽을 클릭한 경우에만 closeModal 호출
    if (event.target === event.currentTarget) {
      closeModal();
    }
  };

  return (
    <div className={styles.Modal} onClick={handleBackgroundClick}>
      <div className={styles.modal_layout} onClick={(e) => e.stopPropagation()}>
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
