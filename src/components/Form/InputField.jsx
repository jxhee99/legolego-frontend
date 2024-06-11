import styles from './InputField.module.css';
import PropTypes from 'prop-types';

const InputField = ({ type, text, placeholder }) => {
  return (
    <div className={styles.InputField}>
      <input id={text} type={type} placeholder=" " />
      <label htmlFor={text}>{text}</label>
    </div>
  );
};

export default InputField;
