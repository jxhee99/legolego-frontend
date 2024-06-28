import React from 'react';
import styles from './InputField.module.css';

const InputField = ({
  type,
  text,
  name,
  onChange,
  onBlur,
  error,
  maxLength,
  value,
}) => {
  return (
    <div className={styles.InputField}>
      <input
        id={text}
        type={type}
        name={name}
        placeholder=" "
        onChange={onChange}
        onBlur={onBlur}
        maxLength={maxLength}
        value={value}
      />
      <label htmlFor={name}>{text}</label>
      {error && <p className={styles.error}>{error}</p>}
    </div>
  );
};

export default InputField;
