import React, { useState } from 'react';
import axios from 'axios';
import styles from '../Header.module.css';
import Modal from '../../../components/Modal/Modal';
import Form from '../../../components/Form/Form';
import InputField from '../../../components/Form/InputField';
import SubmitButton from '../../../components/Form/SubmitButton';
import PartnerSignUp from './PartnerSignUp/PartnerSignUp';
import LogIn from './LogIn';

const inputFieldsData = [
  { key: 'field-1', type: 'text', text: '이름', name: 'name', maxLength: 50 },
  {
    key: 'field-2',
    type: 'text',
    text: '닉네임',
    name: 'nickname',
    maxLength: 30,
  },
  {
    key: 'field-3',
    type: 'email',
    text: '이메일',
    name: 'email',
    maxLength: 100,
  },
  {
    key: 'field-4',
    type: 'text',
    text: '휴대전화',
    name: 'phone',
    maxLength: 15,
  },
  {
    key: 'field-5',
    type: 'password',
    text: '비밀번호',
    name: 'password',
    maxLength: 255,
  },
  {
    key: 'field-6',
    type: 'password',
    text: '비밀번호 재확인',
    name: 'passwordConfirm',
    maxLength: 255,
  },
];

const createInputFields = (
  fieldsData,
  handleChange,
  checkNickname,
  checkEmail,
  errors
) => {
  return fieldsData.map(({ key, type, text, name, maxLength }) => (
    <InputField
      key={key}
      type={type}
      text={text}
      name={name}
      maxLength={maxLength}
      onChange={handleChange}
      onBlur={
        name === 'nickname'
          ? checkNickname
          : name === 'email'
            ? checkEmail
            : null
      }
      error={errors[name]}
    />
  ));
};

const SignUp = () => {
  const [formData, setFormData] = useState({
    name: '',
    nickname: '',
    email: '',
    phone: '',
    password: '',
    passwordConfirm: '',
  });

  const [showPartnerSignUp, setShowPartnerSignUp] = useState(false);
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
      case 'name':
        if (!value) errors.name = '이름을 입력해주세요.';
        else if (value.length < 2)
          errors.name = '이름은 최소 2자 이상이어야 합니다.';
        else if (/[0-9]/g.test(value))
          errors.name = '이름에 숫자가 포함될 수 없습니다.';
        else if (/[!@#$%^&*(),.?":{}|<>]/g.test(value))
          errors.name = '이름에 특수 문자가 포함될 수 없습니다.';
        else errors.name = '';
        break;
      case 'nickname':
        if (!value) errors.nickname = '닉네임을 입력해주세요.';
        else if (value.length < 2)
          errors.nickname = '닉네임은 최소 2자 이상이어야 합니다.';
        else if (/[!@#$%^&*(),.?":{}|<>]/g.test(value))
          errors.nickname = '닉네임에 특수 문자가 포함될 수 없습니다.';
        else errors.nickname = '';
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
    if (!data.name) errors.name = '이름을 입력해주세요.';
    if (!data.nickname) errors.nickname = '닉네임을 입력해주세요.';
    if (!data.email) errors.email = '이메일을 입력해주세요.';
    if (!data.phone) errors.phone = '전화번호를 입력해주세요.';
    if (!data.password) errors.password = '비밀번호를 입력해주세요.';
    if (!data.passwordConfirm)
      errors.passwordConfirm = '비밀번호 확인해주세요.';

    // 최소 길이 검사
    if (data.name && data.name.length < 2)
      errors.name = '이름은 최소 2자 이상이어야 합니다.';
    if (data.nickname && data.nickname.length < 2)
      errors.nickname = '닉네임은 최소 2자 이상이어야 합니다.';
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
    if (data.name && specialCharPattern.test(data.name))
      errors.name = '이름에 특수 문자가 포함될 수 없습니다.';
    if (data.nickname && specialCharPattern.test(data.nickname))
      errors.nickname = '닉네임에 특수 문자가 포함될 수 없습니다.';
    if (data.phone && specialCharPattern.test(data.phone))
      errors.phone = '전화번호에 특수 문자가 포함될 수 없습니다.';

    return errors;
  };

  // 유효성 검사 - 닉네임 중복
  const checkNickname = async (e) => {
    const nickname = e.target.value;
    try {
      const response = await axios.get(
        `http://localhost:8080/auth/check-nickname?nickname=${nickname}`
      );
      if (!response.data) {
        setErrors((prev) => ({
          ...prev,
          nickname: '이미 사용 중인 닉네임입니다.',
        }));
      } else {
        setErrors((prev) => ({ ...prev, nickname: '' }));
      }
    } catch (error) {
      console.error('닉네임 중복 검사 실패:', error);
    }
  };

  // 유효성 검사 - 이메일 중복
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
        'http://localhost:8080/auth/signup?role=USER',
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
      {!showPartnerSignUp && !showLogin && (
        <Modal title="회원가입">
          <Form
            onSubmit={handleSignUp}
            fields={createInputFields(
              inputFieldsData,
              handleChange,
              checkNickname,
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
          <button onClick={() => setShowPartnerSignUp(true)}>
            여행사 회원가입
          </button>
        </Modal>
      )}
      {showPartnerSignUp && <PartnerSignUp />}
      {showLogin && <LogIn />}
    </div>
  );
};

export default SignUp;
