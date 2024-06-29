import React from 'react';
import { Link } from 'react-router-dom';
import ListMenu from '../../components/List/ListMenu';
import PartnerHeader from '../../components/Header/PartnerHeader';

const Partner = () => {
  return (
    <>
      <PartnerHeader />
      <ListMenu>
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
          <Link to="/partner/lists/orders">여행 상품</Link>
        </li>
      </ListMenu>
    </>
  );
};

export default Partner;
