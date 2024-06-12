import PropTypes from 'prop-types';
import styles from './Form.module.css';

const Form = ({ fields, submitButton, findAccount }) => {
  return (
    <form className={styles.Form}>
      {fields}
      {submitButton}
      {findAccount}
    </form>
  );
};

Form.propTypes = {
  fields: PropTypes.arrayOf(PropTypes.element).isRequired,
  submitButton: PropTypes.element.isRequired,
  findAccount: PropTypes.element.isRequired,
};

export default Form;
