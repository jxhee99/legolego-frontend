import { useState } from 'react';
import './FindAccount.module.css';
import Form from '../../components/Form/Form';
import InputField from '../../components/Form/InputField';
import SubmitButton from '../../components/Form/SubmitButton';
import axios from 'axios';

const FindAccount = () => {
  const [formData, setFormData] = useState({ name: '', phone: '' });
  const [message, setMessage] = useState('');
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const validateForm = (data) => {
    const errors = {};

    if (!data.name) errors.name = '이름 또는 회사명을 입력해주세요.';
    if (!data.phone) errors.phone = '전화번호를 입력해주세요.';

    return errors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formErrors = validateForm(formData);
    if (Object.keys(formErrors).length > 0) {
      setErrors(formErrors);
      return;
    }

    try {
      // 먼저 find-user-email 엔드포인트 호출 시도
      let response = await axios.get('http://localhost:8080/auth/find-user-email', {
        params: {
          userName: formData.name,
          userPhone: formData.phone,
        },
      });

      setMessage(`아이디: ${response.data}`);
    } catch (userError) {
      // find-user-email 엔드포인트에서 실패하면 find-partner-email 엔드포인트 호출 시도
      try {
        const response = await axios.get('http://localhost:8080/auth/find-partner-email', {
          params: {
            companyName: formData.name,
            partnerPhone: formData.phone,
          },
        });

        setMessage(`아이디: ${response.data}`);
      } catch (partnerError) {
        setMessage('계정을 찾을 수 없습니다. 다시 시도해주세요.');
        console.error('계정 찾기 에러:', partnerError);
      }
    }
  };

  return (
    <div>
      <h2>아이디 찾기</h2>
      {message && <p>{message}</p>}
      <Form
        onSubmit={handleSubmit}
        fields={[
          <InputField
            key="field-1"
            type="text"
            text="이름 또는 회사명을 입력해주세요"
            name="name"
            value={formData.name}
            onChange={handleChange}
            error={errors.name}
          />,
          <InputField
            key="field-2"
            type="text"
            text="전화번호를 입력해주세요"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            error={errors.phone}
          />,
        ]}
        submitButton={<SubmitButton text="아이디 찾기" />}
      />
    </div>
  );
};

export default FindAccount;
