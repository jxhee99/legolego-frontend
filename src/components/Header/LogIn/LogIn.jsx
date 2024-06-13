import Modal from '../../Modal/Modal';
import Form from '../../Form/Form';
import InputField from '../../Form/InputField';
import SubmitButton from '../../Form/SubmitButton';

const LogIn = () => {
  return (
    <>
      <Modal title="로그인">
        <Form
          fields={[
            <InputField key="field-1" type="email" text="아이디" />,
            <InputField key="field-2" type="password" text="비밀번호" />,
          ]}
          submitButton={<SubmitButton text="로그인" />}
          findAccount={
            <p>
              <span>아이디 찾기</span> / <span>비밀번호 찾기</span>
            </p>
          }
        />
      </Modal>
    </>
  );
};

export default LogIn;
