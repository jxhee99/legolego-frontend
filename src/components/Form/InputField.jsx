import styles from './InputField.module.css';

const InputField = ({ type, text, value = '', onChange, name }) => {
  return (
    <div className={styles.InputField}>
      <input
        id={name}
        name={name}
        type={type}
        placeholder=" "
        value={value}
        onChange={onChange}
      />
      <label htmlFor={name}>{text}</label>
    </div>
  );
};

export default InputField;
