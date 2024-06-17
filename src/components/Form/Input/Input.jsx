import styles from './Input.module.css';

const Input = ({ id, text, type }) => {
  return (
    <div className={styles.Input}>
      <label htmlFor={id}>{text}</label>
      <input type={type} id={id} />
    </div>
  );
};

export default Input;
