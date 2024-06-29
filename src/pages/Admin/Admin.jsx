import React, { useContext } from 'react';
import { AuthContext } from '../../contexts/AuthContext';

const Admin = () => {
  const { role, handleLogout } = useContext(AuthContext);

  if (role !== 'ADMIN') {
    return <div>권한이 없습니다.</div>;
  }

  return <div>Admin Home</div>;
};

export default Admin;
