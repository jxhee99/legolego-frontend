// import styles from './SubmitButton.module.css';

// const SubmitButton = ({ text, onClick }) => {
//   const handleForm = (e) => {
//     e.preventDefault();
//     if (onClick) onClick(e);
//   };

//   return (
//     <button className={styles.SubmitButton} onClick={handleForm}>
//       {text}
//     </button>
//   );
// };

import React from 'react';
import styles from './SubmitButton.module.css';

const SubmitButton = ({ text }) => {
  return <button type="submit" className={styles.SubmitButton}>{text}</button>;
};

export default SubmitButton;
