import { useState } from 'react';
import styles from './AdminLogin.module.css';
import Form from '../../components/Form/Form';
import InputField from '../../components/Form/InputField';
import SubmitButton from '../../components/Form/SubmitButton';
import axios from 'axios';

const AdminLogin = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [message, setMessage] = useState('');

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleNameChange = (e) => {
    setName(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('/api/auth/login', {
        email,
        password,
        name,
      });

      const data = await response.json();
      setMessage(data.message);
    } catch (error) {
      console.error('Error:', error);
      setMessage('Failed to find account. Please try again later.');
    }
  };

  return (
    <div className={styles.container}>
      <h2 className={styles.heading}>관리자 로그인</h2>
      <Form
        className={styles.form}
        fields={[
          <InputField
            key="field-1"
            type="email"
            text="이메일"
            value={email}
            onChange={handleEmailChange}
            className={styles.form_field}
          />,
          <InputField
            key="field-2"
            type="password"
            text="비밀번호"
            value={password}
            onChange={handlePasswordChange}
            className={styles.form_field}
          />,
          <InputField
            key="field-3"
            type="text"
            text="이름"
            value={name}
            onChange={handleNameChange}
            className={styles.form_field}
          />,
        ]}
        submitButton={
          <SubmitButton
            text="로그인"
            onClick={handleSubmit}
            className={styles.form_button}
          />
        }
      />
    </div>
  );
};

export default AdminLogin;
