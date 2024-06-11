import styles from './SubmitButton.module.css';

const SubmitButton = ({ text }) => {
  return <button className={styles.SubmitButton}>{text}</button>;
};

export default SubmitButton;
