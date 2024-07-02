// import React, { createContext, useState, useEffect } from 'react';
// import { useNavigate } from 'react-router-dom';
// import apiClient from '../api/apiClient';

// const AuthContext = createContext();

// const AuthProvider = ({ children }) => {
//   // const [isAuthenticated, setIsAuthenticated] = useState(false);
//   // const [role, setRole] = useState(null);
//   const [isAuthenticated, setIsAuthenticated] = useState(!!localStorage.getItem('accessToken'));
//   const [role, setRole] = useState(localStorage.getItem('role'));
//   const [redirectPath, setRedirectPath] = useState('/');
//   const [userNum, setUserNum] = useState(localStorage.getItem('num'));
//   const navigate = useNavigate();

//   const login = (accessToken, userRole) => {
//     console.log('로그인 함수 호출됨:', { accessToken, userRole });
//     setIsAuthenticated(true);
//     setRole(userRole);
//     localStorage.setItem('accessToken', accessToken);
//     localStorage.setItem('role', userRole);
//     localStorage.setItem('num', userNum);
//     console.log('로그인 후 role 값:', userRole);
//     navigate(redirectPath); // 로그인 후 저장된 경로로 리디렉션

//     if (userRole === 'ADMIN') {
//       navigate('/admin');
//     } else if (userRole === 'PARTNER') {
//       navigate('/partner');
//     } else {
//       navigate('/home');
//     }
//   };

//   const logout = () => {
//     console.log('로그아웃 함수 호출됨');
//     try {
//       await apiClient.post('/auth/logout');  // 로그아웃 API 호출
//     } catch (error) {
//       console.error('로그아웃 에러', error);
//     }
//     setIsAuthenticated(false);
//     setRole(null);
//     localStorage.removeItem('accessToken');
//     localStorage.removeItem('role');
//     localStorage.removeItem('num');
//     navigate('/home');
//   };

//   useEffect(() => {
//     const token = localStorage.getItem('accessToken');
//     const userRole = localStorage.getItem('role');
//     if (token && userRole) {
//       console.log('토큰과 역할이 로컬 스토리지에서 로드됨:', {
//         token,
//         userRole,
//       });
//       setIsAuthenticated(true);
//       setRole(userRole);
//       setUserNum(localStorage.getItem('num'));
//     } else {
//       console.log('No token or role found');
//     }
//   }, []);

//   // useEffect(() => {
//   //   console.log('role 변경:', role);
//   //   if (role === 'PARTNER') {
//   //     navigate('/partner');
//   //   }
//   //   if (role === 'ADMIN') {
//   //     navigate('/admin');
//   //   }
//   // }, [role]);

//   return (
//     <AuthContext.Provider
//       value={{ isAuthenticated, role, login, logout, setRedirectPath }}
//     >
//       {children}
//     </AuthContext.Provider>
//   );
// };

// export { AuthContext, AuthProvider };

import React, { createContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import apiClient from '../api/apiClient';

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(!!localStorage.getItem('accessToken'));
  const [role, setRole] = useState(localStorage.getItem('role'));
  const [redirectPath, setRedirectPath] = useState('/');
  const [userNum, setUserNum] = useState(localStorage.getItem('num'));
  const navigate = useNavigate();

  const login = (accessToken, userRole) => {
    console.log('로그인 함수 호출됨:', { accessToken, userRole });
    setIsAuthenticated(true);
    setRole(userRole);
    localStorage.setItem('accessToken', accessToken);
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

  const logout = async () => {
    console.log('로그아웃 함수 호출됨');
    try {
      await apiClient.post('/auth/logout'); // 로그아웃 API 호출
    } catch (error) {
      console.error('로그아웃 에러:', error);
    }
    setIsAuthenticated(false);
    setRole(null);
    localStorage.removeItem('accessToken');
    localStorage.removeItem('role');
    localStorage.removeItem('num');
    navigate('/home');
  };

  useEffect(() => {
    const token = localStorage.getItem('accessToken');
    const userRole = localStorage.getItem('role');
    if (token && userRole) {
      console.log('토큰과 역할이 로컬 스토리지에서 로드됨:', {
        token,
        userRole,
      });
      setIsAuthenticated(true);
      setRole(userRole);
      setUserNum(localStorage.getItem('num'));
    } else {
      console.log('No token or role found');
    }
  }, []);

  return (
    <AuthContext.Provider
      value={{ isAuthenticated, role, login, logout, setRedirectPath }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export { AuthContext, AuthProvider };
