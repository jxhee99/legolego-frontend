import PropTypes from 'prop-types';
import styles from './Form.module.css';

const Form = ({ fields, submitButton, findAccount }) => {
  return (
    <form className={styles.Form}>
      {fields}
      {submitButton}
      <div className={styles.FindAccount}>{findAccount}</div>
    </form>
  );
};

Form.propTypes = {
  fields: PropTypes.arrayOf(PropTypes.element).isRequired,
  submitButton: PropTypes.element.isRequired,
  findAccount: PropTypes.oneOfType([
    PropTypes.element,
    PropTypes.string,
    PropTypes.node,
  ]).isRequired,
};

export default Form;
