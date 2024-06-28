import React, { useState } from 'react';
import axios from 'axios';
import styles from './PartnerSignUp.module.css';
import Modal from '../../../../components/Modal/Modal';
import Form from '../../../../components/Form/Form';
import InputField from '../../../../components/Form/InputField';
import SubmitButton from '../../../../components/Form/SubmitButton';
import LogIn from '../LogIn';

const inputFieldsData = [
  {
    key: 'field-1',
    type: 'text',
    text: '회사 이름',
    name: 'companyName',
    maxLength: 100,
  },
  {
    key: 'field-2',
    type: 'email',
    text: '이메일',
    name: 'email',
    maxLength: 100,
  },
  {
    key: 'field-3',
    type: 'text',
    text: '휴대전화',
    name: 'phone',
    maxLength: 15,
  },
  {
    key: 'field-4',
    type: 'password',
    text: '비밀번호',
    name: 'password',
    maxLength: 255,
  },
  {
    key: 'field-5',
    type: 'password',
    text: '비밀번호 재확인',
    name: 'passwordConfirm',
    maxLength: 255,
  },
];

const createInputFields = (fieldsData, handleChange, checkEmail, errors) => {
  return fieldsData.map(({ key, type, text, name, maxLength }) => (
    <InputField
      key={key}
      type={type}
      text={text}
      name={name}
      maxLength={maxLength}
      onChange={handleChange}
      onBlur={name === 'email' ? checkEmail : null}
      error={errors[name]}
    />
  ));
};

const PartnerSignUp = () => {
  const [formData, setFormData] = useState({
    companyName: '',
    email: '',
    phone: '',
    password: '',
    passwordConfirm: '',
  });

  const [showLogin, setShowLogin] = useState(false);
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    // 각 필드별 실시간 유효성 검사
    const formErrors = validateField(name, value);
    setErrors((prev) => ({ ...prev, ...formErrors }));
  };

  const validateField = (name, value) => {
    const errors = {};

    // 필드 별 유효성 검사 로직
    switch (name) {
      case 'companyName':
        if (!value) errors.companyName = '회사명을 입력해주세요.';
        else if (value.length < 2)
          errors.companyName = '회사명은 최소 2자 이상이어야 합니다.';
        else if (/[!@#$%^&*(),.?":{}|<>]/g.test(value))
          errors.companyName = '회사명에 특수 문자가 포함될 수 없습니다.';
        else errors.companyName = '';
        break;
      case 'email':
        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!value) errors.email = '이메일을 입력해주세요.';
        else if (!emailPattern.test(value))
          errors.email = '올바른 이메일 형식이 아닙니다.';
        else errors.email = '';
        break;
      case 'phone':
        // const phonePattern = /^\d{10,15}$/;
        const phonePattern = /^010-\d{3,4}-\d{4}$/;
        if (!value) errors.phone = '전화번호를 입력해주세요.';
        else if (!phonePattern.test(value))
          errors.phone = '010-0000-0000 형식이어야 합니다.';
        else if (/[!@#$%^&*(),.?":{}|<>]/g.test(value))
          errors.phone = '전화번호에 특수 문자가 포함될 수 없습니다.';
        else errors.phone = '';
        break;
      case 'password':
        if (!value) errors.password = '비밀번호를 입력해주세요.';
        else if (value.length < 8)
          errors.password = '비밀번호는 최소 8자 이상이어야 합니다.';
        else errors.password = '';
        break;
      case 'passwordConfirm':
        if (value !== formData.password)
          errors.passwordConfirm = '비밀번호가 일치하지 않습니다.';
        else errors.passwordConfirm = '';
        break;
      default:
        break;
    }

    return errors;
  };

  const validateForm = (data) => {
    const errors = {};

    // 필수 필드 검사
    if (!data.companyName) errors.companyName = '회사명을 입력해주세요.';
    if (!data.email) errors.email = '이메일을 입력해주세요.';
    if (!data.phone) errors.phone = '전화번호를 입력해주세요.';
    if (!data.password) errors.password = '비밀번호를 입력해주세요.';
    if (!data.passwordConfirm)
      errors.passwordConfirm = '비밀번호 확인해주세요.';

    // 최소 길이 검사
    if (data.companyName && data.companyName.length < 2)
      errors.companyName = '회사명은 최소 2자 이상이어야 합니다.';
    if (data.phone && data.phone.length < 13)
      errors.phone = '휴대전화는 최소 13자 이상이어야 합니다.';
    if (data.password && data.password.length < 8)
      errors.password = '비밀번호는 최소 8자 이상이어야 합니다.';

    // 이메일 형식 검사
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (data.email && !emailPattern.test(data.email))
      errors.email = '올바른 이메일 형식이 아닙니다.';

    // 전화번호 형식 검사
    // const phonePattern = /^\d{10,15}$/;
    const phonePattern = /^010-\d{3,4}-\d{4}$/;
    if (data.phone && !phonePattern.test(data.phone))
      errors.phone = '010-0000-0000 형식이어야 합니다.';

    // 비밀번호 일치 여부 확인
    if (data.password !== data.passwordConfirm) {
      errors.passwordConfirm = '비밀번호가 일치하지 않습니다.';
    }

    // 특수 문자 검사
    const specialCharPattern = /[!@#$%^&*(),.?":{}|<>]/g;
    if (data.companyName && specialCharPattern.test(data.companyName))
      errors.companyName = '회사명에 특수 문자가 포함될 수 없습니다.';
    if (data.phone && specialCharPattern.test(data.phone))
      errors.phone = '전화번호에 특수 문자가 포함될 수 없습니다.';

    return errors;
  };

  const checkEmail = async (e) => {
    const email = e.target.value;
    try {
      const response = await axios.get(
        `http://localhost:8080/auth/check-email?email=${email}`
      );
      if (!response.data) {
        setErrors((prev) => ({
          ...prev,
          email: '이미 사용 중인 이메일입니다.',
        }));
      } else {
        setErrors((prev) => ({ ...prev, email: '' }));
      }
    } catch (error) {
      console.error('이메일 중복 검사 실패:', error);
    }
  };

  const handleSignUp = async (e) => {
    e.preventDefault();
    const formErrors = validateForm(formData);
    if (Object.keys(formErrors).length > 0) {
      setErrors(formErrors);
      return;
    }

    try {
      const response = await axios.post(
        'http://localhost:8080/auth/signup?role=PARTNER',
        formData,
        {
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );

      console.log('회원가입 성공:', response.data);
    } catch (error) {
      console.error('회원가입 실패:', error);
    }
  };

  return (
    <div className={styles.SignUp}>
      {!showLogin ? (
        <Modal title="여행사 회원가입">
          <Form
            onSubmit={handleSignUp}
            fields={createInputFields(
              inputFieldsData,
              handleChange,
              checkEmail,
              errors
            )}
            submitButton={<SubmitButton text="회원가입" />}
            findAccount={
              <p
                onClick={() => setShowLogin(true)}
                style={{ cursor: 'pointer' }}
              >
                이미 회원이신가요? 로그인하기
              </p>
            }
          />
        </Modal>
      ) : (
        <LogIn />
      )}
    </div>
  );
};

export default PartnerSignUp;
