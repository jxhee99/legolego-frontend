import React from 'react';
import { Link } from 'react-router-dom';
import ListMenu from '../../components/List/ListMenu';

const Partner = () => {
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
        <span>로그아웃</span>
      </li>
    </ListMenu>
  );
};

export default Partner;
