import PropTypes from 'prop-types';
import styles from './Form.module.css';

const Form = ({ fields, submitButton, findAccount }) => {
  return (
    <form className={styles.Form}>
      {fields}
      {submitButton}
      <p>{findAccount}</p>
    </form>
  );
};

Form.propTypes = {
  fields: PropTypes.arrayOf(PropTypes.element).isRequired,
  submitButton: PropTypes.element.isRequired,
  findAccount: PropTypes.string.isRequired,
};

export default Form;
