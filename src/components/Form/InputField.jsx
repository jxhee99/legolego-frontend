// import styles from './InputField.module.css';

// const InputField = ({ type, text }) => {
//   return (
//     <div className={styles.InputField}>
//       <input id={text} type={type} placeholder=" " />
//       <label htmlFor={text}>{text}</label>
//     </div>
//   );
// };

// export default InputField;

import React from 'react';
import styles from './InputField.module.css';

const InputField = ({ type, text, name, onChange }) => {
  return (
    <div className={styles.InputField}>
      <input id={text} type={type} name={name} placeholder=" " onChange={onChange} />
      <label htmlFor={text}>{text}</label>
    </div>
  );
};

export default InputField;
