import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import ListMenu from '../../components/List/ListMenu';
import { AuthContext } from '../../contexts/AuthContext';

const Partner = () => {

  const { role, handleLogout } = useContext(AuthContext);

  if (role !== 'PARTNER') {
    return <div>권한이 없습니다.</div>;
  }

  return (
    <ListMenu title={<Link to="/partner">여행사 페이지</Link>}>
      <li>
        <Link to="/partner/profile">프로필 관리</Link>
      </li>
      <li>
        <Link to="/partner/lists/packages">Diy 목록</Link>
      </li>
      <li>
        <Link to="/partner/lists/prices">가격 제안 목록</Link>
      </li>
      <li>
        <Link to="/admin/lists/orders">여행 상품</Link>
      </li>
      <li>
      <span onClick={handleLogout} style={{ cursor: 'pointer' }}>로그아웃</span>
      </li>
    </ListMenu>
  );
};

export default Partner;
