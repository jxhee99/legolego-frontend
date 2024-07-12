import { useState } from 'react';
import InputField from '../../components/Form/InputField';
import SubmitButton from '../../components/Form/SubmitButton';
import Form from '../../components/Form/Form';
import styles from './FindAccount.module.css';
import apiClient from '../../api/apiClient';

const FindPassword = () => {
  const [formData, setFormData] = useState({ email: '', name: '', phone: '' });
  const [message, setMessage] = useState('');
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const validateForm = () => {
    const errors = {};
    if (!formData.email) errors.email = '이메일을 입력해주세요.';
    if (!formData.name) errors.name = '이름 또는 회사명을 입력해주세요.';
    if (!formData.phone) errors.phone = '전화번호를 입력해주세요.';
    return errors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formErrors = validateForm();
    if (Object.keys(formErrors).length > 0) {
      setErrors(formErrors);
      return;
    }
    try {
      const response = await apiClient.post('/auth/find-password', formData);
      setMessage(response.data);
    } catch (error) {
      setMessage('비밀번호 재설정 요청 중 오류가 발생했습니다.');
    }
  };

  return (
    <div className={styles.FindPassword}>
      <div className={styles.findPasswordContent}>
        <h2>비밀번호 찾기</h2>
        {message && (
          <p
            className={`${styles.message} ${message.includes('오류') ? styles.errorMessage : styles.successMessage}`}
          >
            {message}
          </p>
        )}
        <Form
          onSubmit={handleSubmit}
          fields={[
            <InputField
              key="field-1"
              type="email"
              text="이메일"
              name="email"
              value={formData.email}
              onChange={handleChange}
              error={errors.email}
            />,
            <InputField
              key="field-2"
              type="text"
              text="이름 또는 회사명"
              name="name"
              value={formData.name}
              onChange={handleChange}
              error={errors.name}
            />,
            <InputField
              key="field-3"
              type="tel"
              text="전화번호"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              error={errors.phone}
            />,
          ]}
          submitButton={<SubmitButton text="비밀번호 찾기" />}
        />
      </div>
    </div>
  );
};

export default FindPassword;
