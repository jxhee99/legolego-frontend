import { useState } from 'react';
import styles from './Modal.module.css';
import Logo from '../Logo/Logo';

const Modal = ({ children }) => {
  const [isVisible, setIsVisible] = useState(true);

  const closeModal = () => {
    setIsVisible(false);
  };

  if (!isVisible) return null;

  return (
    <div className={styles.Modal}>
      <div className={styles.modal_layout}>
        <button className={styles.modal_close_button} onClick={closeModal}>
          x
        </button>
        <div className={styles.modal_title}>
          <Logo />
        </div>
        {children}
      </div>
    </div>
  );
};

export default Modal;
