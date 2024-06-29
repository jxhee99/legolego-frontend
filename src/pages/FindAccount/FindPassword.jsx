import React, { useState } from 'react';
import axios from 'axios';
import InputField from '../../components/Form/InputField';
import SubmitButton from '../../components/Form/SubmitButton';
import Form from '../../components/Form/Form';

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
      const response = await axios.post('http://localhost:8080/auth/find-password', formData);
      setMessage(response.data);
    } catch (error) {
      setMessage('비밀번호 재설정 요청 중 오류가 발생했습니다.');
    }
  };

  return (
    <div>
      <h2>비밀번호 찾기</h2>
      {message && <p>{message}</p>}
      <Form
        onSubmit={handleSubmit}
        fields={[
          <InputField
            key="field-1"
            type="email"
            text="이메일을 입력해주세요"
            name="email"
            value={formData.email}
            onChange={handleChange}
            error={errors.email}
          />,
          <InputField
            key="field-2"
            type="text"
            text="이름 또는 회사명을 입력해주세요"
            name="name"
            value={formData.name}
            onChange={handleChange}
            error={errors.name}
          />,
          <InputField
            key="field-3"
            type="text"
            text="전화번호를 입력해주세요"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            error={errors.phone}
          />,
        ]}
        submitButton={<SubmitButton text="비밀번호 찾기" />}
      />
    </div>
  );
};

export default FindPassword;
