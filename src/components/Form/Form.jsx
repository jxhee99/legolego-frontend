import styles from './Form.module.css';
import PropTypes from 'prop-types';

const Form = ({ fields, submitButton, findAccount }) => {
  return (
    <form>
      {fields.map((field, index) => (
        <div key={index} className="form-field">
          {field}
        </div>
      ))}
      <div className="form-submit">{submitButton}</div>
      <div>{findAccount}</div>
    </form>
  );
};

Form.propTypes = {
  fields: PropTypes.arrayOf(PropTypes.node).isRequired,
  submitButton: PropTypes.node.isRequired,
  findAccount: PropTypes.element.isRequired,
};

export default Form;
