import React, { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import ListMenu from '../../components/List/ListMenu';
import { AuthContext } from '../../contexts/AuthContext';

const Admin = () => {

  const { role, logout } = useContext(AuthContext);

  if (role !== 'ADMIN') {
    return <div>권한이 없습니다.</div>;
  }

  return (
    <ListMenu title={<Link to="/admin">관리자 페이지</Link>}>
      <li>
        <Link to="/admin/profile">프로필 관리</Link>
      </li>
      <li>
        <Link to="/admin/lists/diy-packages">Diy 목록</Link>
      </li>
      <li>
        <Link to="/admin/lists/diy-prices">응원 달성 Diy 목록</Link>
      </li>
      <li>
        <Link to="/admin/lists/products">상품 목록</Link>
      </li>
      <li>
        <Link to="/admin/lists/pre-trips">지난 여행 목록</Link>
      </li>
      <li>
        <Link to="/admin/lists/members">회원 목록</Link>
      </li>
      <li>
      <span onClick={logout} style={{ cursor: 'pointer' }}>로그아웃</span>
      </li>
    </ListMenu>
  );
};

export default Admin;
