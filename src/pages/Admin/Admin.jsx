import React from 'react';
import { Link } from 'react-router-dom';
import ListMenu from '../../components/List/ListMenu';

const Admin = () => {
  return (
    <ListMenu title={<Link to="/admin">관리자 페이지</Link>}>
      <li>
        <Link to="/admin/profile">프로필 관리</Link>
      </li>
      <li>
        <Link to="/admin/lists/diy-packages">Diy 목록</Link>
      </li>
      <li>
        <Link to="/admin/lists/likes-over">응원 달성 Diy 목록</Link>
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
        <span>로그아웃</span>
      </li>
    </ListMenu>
  );
};

export default Admin;
