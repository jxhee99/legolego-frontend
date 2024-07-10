import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import ListMenu from '../../components/List/ListMenu';
import HeaderPartner from '../../components/Header/HeaderPartner';
import DeleteMember from '../../components/Profile/DeleteMember/DeleteMember';

const Partner = () => {
  const location = useLocation();
  const getLinkStyle = (path) => {
    return location.pathname === path
      ? { color: '#81b7e0' }
      : { color: 'black' };
  };
  return (
    <>
      <HeaderPartner />
      <ListMenu>
        <li>
          <Link to="/partner/profile" style={getLinkStyle('/partner/profile')}>
            프로필 관리
          </Link>
        </li>
        <li>
          <Link
            to="/partner/lists/packages"
            style={getLinkStyle('/partner/lists/packages')}
          >
            Diy 목록
          </Link>
        </li>
        <li>
          <Link
            to="/partner/lists/prices"
            style={getLinkStyle('/partner/lists/prices')}
          >
            가격 제안 목록
          </Link>
        </li>
        <li>
          <Link
            to="/partner/lists/orders"
            style={getLinkStyle('/partner/lists/orders')}
          >
            여행 상품
          </Link>
        </li>
        <li>
          <DeleteMember endpoint={'/partner/profile/delete'} />
        </li>
      </ListMenu>
    </>
  );
};

export default Partner;
