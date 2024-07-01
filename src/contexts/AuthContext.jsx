import React, { createContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [role, setRole] = useState(null);
  const [redirectPath, setRedirectPath] = useState('/');
  const [userNum, setUserNum] = useState(null);

  const navigate = useNavigate();

  const login = (token, userRole) => {
    console.log('로그인 함수 호출됨:', { token, userRole });
    setIsAuthenticated(true);
    setRole(userRole);
    localStorage.setItem('token', token);
    localStorage.setItem('role', userRole);
    localStorage.setItem('num', userNum);
    console.log('로그인 후 role 값:', userRole);
    navigate(redirectPath); // 로그인 후 저장된 경로로 리디렉션

    if (userRole === 'ADMIN') {
      navigate('/admin');
    } else if (userRole === 'PARTNER') {
      navigate('/partner');
    } else {
      navigate('/home');
    }
  };

  const logout = () => {
    console.log('로그아웃 함수 호출됨');
    setIsAuthenticated(false);
    setRole(null);
    localStorage.removeItem('token');
    localStorage.removeItem('role');
    localStorage.removeItem('num');
    navigate('/home');
  };

  useEffect(() => {
    const token = localStorage.getItem('token');
    const userRole = localStorage.getItem('role');
    if (token && userRole) {
      console.log('토큰과 역할이 로컬 스토리지에서 로드됨:', {
        token,
        userRole,
      });
      setIsAuthenticated(true);
      setRole(userRole);
      setUserNum(userNum);
    } else {
      console.log('No token or role found');
    }
  }, []);

  useEffect(() => {
    console.log('role 변경:', role);
    if (role === 'PARTNER') {
      navigate('/partner');
    }
    if (role === 'ADMIN') {
      navigate('/admin');
    }
  }, [role]);

  return (
    <AuthContext.Provider
      value={{ isAuthenticated, role, login, logout, setRedirectPath }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export { AuthContext, AuthProvider };