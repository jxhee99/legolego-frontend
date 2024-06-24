import styles from './SubmitButton.module.css';

const SubmitButton = ({ text, onClick }) => {
  const handleForm = (e) => {
    e.preventDefault();
    if (onClick) onClick(e);
  };

  return (
    <button className={styles.SubmitButton} onClick={handleForm}>
      {text}
    </button>
  );
};

export default SubmitButton;
