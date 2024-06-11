import styles from './Login.module.css';
import Modal from '../../components/Modal/Modal';
import Form from '../../components/Form/Form';
import InputField from '../../components/Form/InputField';
import SubmitButton from '../../components/Form/SubmitButton';

const Login = () => {
  return (
    <div className={styles.Login}>
      <Modal title="로그인">
        <Form
          fields={[
            <InputField key="field-1" type="email" text="아이디" />,
            <InputField key="field-2" type="password" text="비밀번호" />,
          ]}
          submitButton={<SubmitButton text="로그인" />}
          findAccount="아이디 찾기 / 비밀번호 찾기"
        />
      </Modal>
    </div>
  );
};

export default Login;
