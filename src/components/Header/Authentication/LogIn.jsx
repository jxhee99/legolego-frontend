import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { AuthContext } from '../../../contexts/AuthContext';
import Modal from '../../Modal/Modal';
import Form from '../../Form/Form';
import InputField from '../../Form/InputField';
import SubmitButton from '../../Form/SubmitButton';

const LogIn = ({ onClose }) => {
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [errors, setErrors] = useState('');
  const { isAuthenticated, login, logout, role } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));

    // 실시간 유효성 검사
    const validationErrors = validateField(name, value);
    setErrors((prev) => ({ ...prev, ...validationErrors }));
  };

  const validateField = (name, value) => {
    const errors = {};
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    switch (name) {
      case 'email':
        if (!value) errors.email = '이메일을 입력해주세요.';
        else if (!emailPattern.test(value))
          errors.email = '올바른 이메일 형식이 아닙니다.';
        else errors.email = '';
        break;
      case 'password':
        if (!value) errors.password = '비밀번호를 입력해주세요.';
        else if (/\s/.test(value))
          errors.password = '비밀번호에 공백 문자가 포함될 수 없습니다.';
        else errors.password = '';
        break;
      default:
        break;
    }
    return errors;
  };

  const validateForm = (data) => {
    const errors = {};

    if (!data.email) errors.email = '이메일을 입력해주세요.';
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email))
      errors.email = '올바른 이메일 형식이 아닙니다.';

    if (!data.password) errors.password = '비밀번호를 입력해주세요.';
    else if (/\s/.test(data.password))
      errors.password = '비밀번호에 공백 문자가 포함될 수 없습니다.';

    return errors;
  };

  const handleLogin = async (e) => {
    e.preventDefault();

    // 폼 유효성 검사
    const formErrors = validateForm(formData);
    if (Object.keys(formErrors).length > 0) {
      setErrors(formErrors);
      return;
    }

    try {
      const response = await axios.post(
        'http://localhost:8080/auth/login',
        formData,
        {
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );
      const { token, role } = response.data;
      login(token, role); // AuthContext의 login 메서드 호출
      console.log('로그인 성공:', token);
      if (role === 'PARTNER') {
        navigate('/partner'); // /partner 페이지로 리디렉션
      } else if (role === 'USER') {
        navigate('/home'); // /user 페이지로 리디렉션
        onClose(); // 로그인 성공 후 모달 닫기
      } else {
        setErrors({ form: '가입되지 않은 계정입니다.' });
      }
    } catch (error) {
      if (error.response && error.response.status === 401) {
        if (error.response.data.message === 'Invalid password') {
          setErrors({ form: '아이디와 비밀번호를 다시 확인해주세요.' });
        }
      } else {
        setErrors({ form: '로그인 중 오류가 발생했습니다.' });
      }
      console.error('로그인 에러:', error);
    }
  };

  const handleLogout = () => {
    logout();
    navigate('/home'); // 로그아웃 후 홈 페이지로 리디렉션
  };

  return (
    <>
      {!isAuthenticated ? (
        <Modal title="로그인">
          {errors.form && <p style={{ color: 'red' }}>{errors.form}</p>}
          <Form
            onSubmit={handleLogin}
            fields={[
              <InputField
                key="field-1"
                type="email"
                text="아이디"
                name="email"
                value={formData.email}
                onChange={handleChange}
                error={errors.email}
              />,
              <InputField
                key="field-2"
                type="password"
                text="비밀번호"
                name="password"
                value={formData.password}
                onChange={handleChange}
                error={errors.password}
              />,
            ]}
            submitButton={<SubmitButton text="로그인" />}
            findAccount={
              <p>
                <span>아이디 찾기</span> / <span>비밀번호 찾기</span>
              </p>
            }
          />
        </Modal>
      ) : (
        <button onClick={handleLogout}>로그아웃</button>
      )}
    </>
  );
};

export default LogIn;
