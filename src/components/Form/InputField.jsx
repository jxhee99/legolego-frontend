import styles from './InputField.module.css';

const InputField = ({ type, text, value, onChange }) => {
  return (
    <div className={styles.InputField}>
      <input
        id={text}
        type={type}
        placeholder=" "
        value={value}
        onChange={onChange}
      />
      <label htmlFor={text}>{text}</label>
    </div>
  );
};

export default InputField;
