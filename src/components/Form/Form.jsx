// import PropTypes from 'prop-types';
// import styles from './Form.module.css';

// const Form = ({ fields, submitButton, findAccount }) => {
//   return (
//     <form className={styles.Form}>
//       {fields}
//       {submitButton}
//       {findAccount}
//     </form>
//   );
// };

// Form.propTypes = {
//   fields: PropTypes.arrayOf(PropTypes.element).isRequired,
//   submitButton: PropTypes.element.isRequired,
//   findAccount: PropTypes.element.isRequired,
// };

// export default Form;

import PropTypes from 'prop-types';
import styles from './Form.module.css';

const Form = ({ fields, submitButton, findAccount, onSubmit }) => {
  return (
    <form className={styles.Form} onSubmit={onSubmit}>
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
  onSubmit: PropTypes.func.isRequired,
};

export default Form;
