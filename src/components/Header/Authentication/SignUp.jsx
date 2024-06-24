// import styles from '../Header.module.css';
// import Modal from '../../Modal/Modal';
// import Form from '../../Form/Form';
// import InputField from '../../Form/InputField';
// import SubmitButton from '../../Form/SubmitButton';
// import axios from 'axios';
// import React, {useState} from 'react';

// const inputFieldsData = [
//   { key: 'field-1', type: 'text', text: '이름' },
//   { key: 'field-2', type: 'text', text: '닉네임' },
//   { key: 'field-3', type: 'email', text: '이메일' },
//   { key: 'field-4', type: 'text', text: '휴대전화' },
//   { key: 'field-5', type: 'password', text: '비밀번호' },
//   { key: 'field-6', type: 'password', text: '비밀번호 재확인' },
// ];

// const createInputFields = (fieldsData, handleChange) => {
//   return fieldsData.map(({ key, type, text, name }) => (
//     <InputField key={key} type={type} text={text} name={name} onChange={handleChange} />
//   ));
// };

// const SignUp = () => {
//   const [formData, setFormData] = useState({
//     name: '',
//     nickname: '',
//     email: '',
//     phone: '',
//     password: '',
//     passwordConfirm: '',
//   });

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData((prev) => ({
//       ...prev,
//       [name]: value,
//     }));
//   };

//   const handleSignUp = async (e) => {
//     e.preventDefault();
//     try {
//       const response = await axios.post('/auth/signup', formData, {
//         headers: {
//           'Content-Type': 'application/json',
//         },
//       });

//       console.log('회원가입 성공:', response.data);
//     } catch (error) {
//       console.error('회원가입 에러:', error);
//     }
//   };


//   return (
//     <div className={styles.SignUp}>
//       <Modal title="회원가입">
//         <Form onSubmit={handleSignUp}>
//           {createInputFields(inputFieldsData, handleChange)}
//           <SubmitButton text="회원가입" />
//           <p>이미 회원이신가요? 로그인하기</p>
//         </Form>
//       </Modal>
//     </div>
//   );
// };


// export default SignUp;


import React, { useState } from 'react';
import axios from 'axios';
import styles from '../Header.module.css';
import Modal from '../../Modal/Modal';
import Form from '../../Form/Form';
import InputField from '../../Form/InputField';
import SubmitButton from '../../Form/SubmitButton';

const inputFieldsData = [
  { key: 'field-1', type: 'text', text: '이름', name: 'name' },
  { key: 'field-2', type: 'text', text: '닉네임', name: 'nickname' },
  { key: 'field-3', type: 'email', text: '이메일', name: 'email' },
  { key: 'field-4', type: 'text', text: '휴대전화', name: 'phone' },
  { key: 'field-5', type: 'password', text: '비밀번호', name: 'password' },
  { key: 'field-6', type: 'password', text: '비밀번호 재확인', name: 'passwordConfirm' },
];

const createInputFields = (fieldsData, handleChange) => {
  return fieldsData.map(({ key, type, text, name }) => (
    <InputField key={key} type={type} text={text} name={name} onChange={handleChange} />
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

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSignUp = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:8080/auth/signup', formData, {
        headers: {
          'Content-Type': 'application/json',
        },
      });

      console.log('회원가입 성공:', response.data);
    } catch (error) {
      console.error('회원가입 에러:', error);
    }
  };

  return (
    <div className={styles.SignUp}>
      <Modal title="회원가입">
        <Form
          onSubmit={handleSignUp}
          fields={createInputFields(inputFieldsData, handleChange)}
          submitButton={<SubmitButton text="회원가입" />}
          findAccount={<p>이미 회원이신가요? 로그인하기</p>}
        />
      </Modal>
    </div>
  );
};

export default SignUp;
