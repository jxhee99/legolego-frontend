import React, { useContext } from 'react';
import { AuthContext } from '../../contexts/AuthContext';

const Admin = () => {
  const { role } = useContext(AuthContext);

  if (role !== 'ADMIN') {
    return <div>권한이 없습니다.</div>;
  }

  return <div></div>;
};

export default Admin;
