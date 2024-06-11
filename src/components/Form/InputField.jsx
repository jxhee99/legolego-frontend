import styles from './InputField.module.css';

const InputField = ({ type, text }) => {
  return (
    <div className={styles.InputField}>
      <input id={text} type={type} placeholder=" " />
      <label htmlFor={text}>{text}</label>
    </div>
  );
};

export default InputField;
