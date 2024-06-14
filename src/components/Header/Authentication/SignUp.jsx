import styles from '../Header.module.css';
import Modal from '../../Modal/Modal';
import Form from '../../Form/Form';
import InputField from '../../Form/InputField';
import SubmitButton from '../../Form/SubmitButton';

const inputFieldsData = [
  { key: 'field-1', type: 'text', text: '이름' },
  { key: 'field-2', type: 'text', text: '닉네임' },
  { key: 'field-3', type: 'email', text: '이메일' },
  { key: 'field-4', type: 'email', text: '휴대전화' },
  { key: 'field-5', type: 'password', text: '비밀번호' },
  { key: 'field-6', type: 'password', text: '비밀번호 재확인' },
];

const createInputFields = (fieldsData) => {
  return fieldsData.map(({ key, type, text }) => (
    <InputField key={key} type={type} text={text} />
  ));
};

const SignUp = () => {
  return (
    <div className={styles.SignUp}>
      <Modal title="회원가입">
        <Form
          fields={createInputFields(inputFieldsData)}
          submitButton={<SubmitButton text="회원가입" />}
          findAccount={<p>이미 회원이신가요? 로그인하기</p>}
        />
      </Modal>
    </div>
  );
};

export default SignUp;
