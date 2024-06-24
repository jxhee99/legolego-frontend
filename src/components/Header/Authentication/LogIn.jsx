// import { useState } from 'react';
// import { useNavigate } from 'react-router-dom';
// import axios from 'axios';
// import { useDispatch, useSelector } from 'react-redux';
// import { login } from '../../../_slices/authSlice';
// import Modal from '../../Modal/Modal';
// import Form from '../../Form/Form';
// import InputField from '../../Form/InputField';
// import SubmitButton from '../../Form/SubmitButton';

// const LogIn = () => {
//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');
//   const [error, setError] = useState('');
//   const dispatch = useDispatch();
//   const navigate = useNavigate();
//   const { isAuthenticated, user } = useSelector((state) => state.auth);

//   const handleLogin = async (e) => {
//     e.preventDefault();
//     try {
//       const response = await axios.post('/api/auth/login', { email, password });
//       console.log(response);
//       dispatch(login(response.data.user));
//     } catch (error) {
//       setError('아이디와 비밀번호를 확인해주세요.');
//     }

//     if (isAuthenticated) {
//       navigate('/home');
//     }
//   };

//   const handleFindAccount = () => {
//     navigate('/find-account');
//   };

//   const handleResetPassword = () => {
//     navigate('/reset-password');
//   };

//   return (
//     <>
//       <Modal>
//         {error && <p style={{ color: 'red' }}>{error}</p>}
//         <Form
//           fields={[
//             <InputField
//               key="field-1"
//               type="email"
//               text="아이디(이메일)"
//               value={email}
//               onChange={(e) => setEmail(e.target.value)}
//             />,
//             <InputField
//               key="field-2"
//               type="password"
//               text="비밀번호"
//               value={password}
//               onChange={(e) => setPassword(e.target.value)}
//             />,
//           ]}
//           submitButton={<SubmitButton text="로그인" onClick={handleLogin} />}
//           findAccount={
//             <p>
//               <span onClick={handleFindAccount}>아이디 찾기</span>{' '}
//               <span onClick={handleResetPassword}>비밀번호 찾기</span>
//             </p>
//           }
//         />
//       </Modal>
//     </>
//   );
// };

// export default LogIn;

// import Modal from '../../Modal/Modal';
// import Form from '../../Form/Form';
// import InputField from '../../Form/InputField';
// import SubmitButton from '../../Form/SubmitButton';
// import React, { useState } from 'react';
// import axios from 'axios';

// const LogIn = () => {
//   return (
//     <>
//       <Modal title="로그인">
//         <Form
//           fields={[
//             <InputField key="field-1" type="email" text="아이디" />,
//             <InputField key="field-2" type="password" text="비밀번호" />,
//           ]}
//           submitButton={<SubmitButton text="로그인" />}
//           findAccount={
//             <p>
//               <span>아이디 찾기</span> / <span>비밀번호 찾기</span>
//             </p>
//           }
//         />
//       </Modal>
//     </>
//   );
// };

// export default LogIn;

import React, { useState } from 'react';
import axios from 'axios';
import Modal from '../../Modal/Modal';
import Form from '../../Form/Form';
import InputField from '../../Form/InputField';
import SubmitButton from '../../Form/SubmitButton';

const LogIn = () => {
  const [formData, setFormData] = useState({ email: '', password: '' });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:8080/auth/login', formData, {
        headers: {
          'Content-Type': 'application/json',
        },
      });
      const { token } = response.data;
      // JWT 토큰을 로컬 스토리지에 저장
      localStorage.setItem('token', token);
      console.log('로그인 성공:', token);
      // 로그인 성공 후 리디렉션
      window.location.href = 'http://localhost:5173'; // 예시 리디렉션 URL
    } catch (error) {
      console.error('로그인 에러:', error);
    }
  };

  return (
    <>
      <Modal title="로그인">
        <Form
          onSubmit={handleLogin}
          fields={[
            <InputField
              key="field-1"
              type="email"
              text="아이디"
              name="email"
              onChange={handleChange}
            />,
            <InputField
              key="field-2"
              type="password"
              text="비밀번호"
              name="password"
              onChange={handleChange}
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
    </>
  );
};

export default LogIn;
