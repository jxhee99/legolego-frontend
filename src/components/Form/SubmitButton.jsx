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

// export default SubmitButton;

// import styles from './SubmitButton.module.css';

// const SubmitButton = ({ text, onClick }) => {
//   return <button className={styles.SubmitButton}>{text}</button>;
// };

// export default SubmitButton;

import React from 'react';
import styles from './SubmitButton.module.css';

const SubmitButton = ({ text }) => {
  return <button type="submit" className={styles.SubmitButton}>{text}</button>;
};

export default SubmitButton;
