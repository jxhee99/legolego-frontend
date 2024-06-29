import React, { useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import axios from 'axios';
import InputField from '../../components/Form/InputField';
import SubmitButton from '../../components/Form/SubmitButton';
import Form from '../../components/Form/Form';

const ResetPassword = () => {
    console.log('ResetPassword component loaded'); // 로드 확인 로그

  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [message, setMessage] = useState('');
  const [errors, setErrors] = useState({});
  const [searchParams] = useSearchParams();
  const token = searchParams.get('token');
  const navigate = useNavigate();

  const validateForm = () => {
    const errors = {};
    if (!newPassword) errors.newPassword = '새 비밀번호를 입력해주세요.';
    if (!confirmPassword) errors.confirmPassword = '비밀번호 확인을 입력해주세요.';
    if (newPassword !== confirmPassword) errors.confirmPassword = '비밀번호가 일치하지 않습니다.';
    return errors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formErrors = validateForm();
    if (Object.keys(formErrors).length > 0) {
      setErrors(formErrors);
      return;
    }
    console.log('Submitting:', { newPassword, token }); // 데이터 확인

    try {
        const response = await axios.post('http://localhost:8080/auth/reset-password', { newPassword, token });
        setMessage('비밀번호가 성공적으로 재설정되었습니다.');
        setTimeout(() => navigate('/login'), 2000);
      } catch (error) {
        console.error('Error:', error); // 에러 로그 추가
        setMessage('비밀번호 재설정 중 오류가 발생했습니다.');
      }
    
  };

  return (
    <div>
      <h2>새 비밀번호 설정</h2>
      {message && <p>{message}</p>}
      <Form
        onSubmit={handleSubmit}
        fields={[
          <InputField
            key="field-1"
            type="password"
            text="새 비밀번호를 입력해주세요"
            name="newPassword"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            error={errors.newPassword}
          />,
          <InputField
            key="field-2"
            type="password"
            text="비밀번호 확인을 입력해주세요"
            name="confirmPassword"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            error={errors.confirmPassword}
          />,
        ]}
        submitButton={<SubmitButton text="비밀번호 재설정" />}
      />
    </div>
  );
};

export default ResetPassword;
