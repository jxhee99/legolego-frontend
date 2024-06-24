import { useState } from 'react';
import './ResetPassword.module.css';
import Form from '../../components/Form/Form';
import InputField from '../../components/Form/InputField';
import SubmitButton from '../../components/Form/SubmitButton';

const ResetPassword = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [message, setMessage] = useState('');

  const handleNameChange = (e) => {
    setName(e.target.value);
  };

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handlePhoneNumberChange = (e) => {
    setPhoneNumber(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch('http://your-backend-api/reset-password', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name, email, phoneNumber }),
      });

      const data = await response.json();
      setMessage(data.message);
    } catch (error) {
      console.error('Error:', error);
      setMessage('Failed to send reset link. Please try again later.');
    }
  };

  return (
    <div>
      <h2>비밀번호 찾기</h2>
      {message && <p>{message}</p>}
      <Form
        fields={[
          <InputField
            key="field-name"
            type="text"
            text="이름"
            value={name}
            onChange={handleNameChange}
          />,
          <InputField
            key="field-email"
            type="email"
            text="이메일"
            value={email}
            onChange={handleEmailChange}
          />,
          <InputField
            key="field-phone"
            type="text"
            text="휴대전화"
            value={phoneNumber}
            onChange={handlePhoneNumberChange}
          />,
        ]}
        submitButton={
          <SubmitButton text="비밀번호 재설정" onClick={handleSubmit} />
        }
        findAccount={<p>아이디 찾기</p>}
      />
    </div>
  );
};

export default ResetPassword;
