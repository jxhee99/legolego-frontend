import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { login } from '../../../_slices/authSlice';
import Modal from '../../Modal/Modal';
import Form from '../../Form/Form';
import InputField from '../../Form/InputField';
import SubmitButton from '../../Form/SubmitButton';

const LogIn = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isAuthenticated, user } = useSelector((state) => state.auth);

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('/auth/login', { email, password });
      console.log(response);
      dispatch(login(response.data.user));
      navigate('/home');
    } catch (error) {
      setError('아이디와 비밀번호를 확인해주세요.');
    }
  };

  return (
    <>
      <Modal>
        {error && <p style={{ color: 'red' }}>{error}</p>}
        <Form
          fields={[
            <InputField
              key="field-1"
              type="email"
              text="아이디(이메일)"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />,
            <InputField
              key="field-2"
              type="password"
              text="비밀번호"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />,
          ]}
          submitButton={<SubmitButton text="로그인" onClick={handleLogin} />}
          findAccount={<p>아이디/비밀번호 찾기</p>}
        />
      </Modal>
    </>
  );
};

export default LogIn;
