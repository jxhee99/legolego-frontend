import React, { useState } from 'react';
import './FindAccount.module.css';
import Form from '../../components/Form/Form';
import InputField from '../../components/Form/InputField';
import SubmitButton from '../../components/Form/SubmitButton';

const FindAccount = () => {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch('http://your-backend-api/find-account', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email }),
      });

      const data = await response.json();
      setMessage(data.message);
    } catch (error) {
      console.error('Error:', error);
      setMessage('Failed to find account. Please try again later.');
    }
  };

  return (
    <div>
      <h2>아이디 찾기</h2>
      {message && <p>{message}</p>}
      <Form
        fields={[
          <InputField
            key="field-1"
            type="email"
            text="이름"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />,
          <InputField
            key="field-1"
            type="email"
            text="휴대전화"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />,
        ]}
        submitButton={
          <SubmitButton text="아이디 찾기" onClick={handleSubmit} />
        }
        findAccount={<p>비밀번호 찾기</p>}
      />
    </div>
  );
};

export default FindAccount;
