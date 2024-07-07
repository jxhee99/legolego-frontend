import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import ListMenu from '../../components/List/ListMenu';
import HeaderAdmin from '../../components/Header/HeaderAdmin';

const AdminMenu = () => {
  const location = useLocation();
  const getLinkStyle = (path) => {
    return location.pathname === path
      ? { color: '#3a86ff' }
      : { color: 'black' };
  };
  return (
    <>
      <HeaderAdmin />
      <ListMenu>
        <li>
          <Link to="/admin/profile" style={getLinkStyle('/admin/profile')}>
            프로필 관리
          </Link>
        </li>
        <li>
          <Link
            to="/admin/lists/diy-packages"
            style={getLinkStyle('/admin/lists/diy-packages')}
          >
            Diy 목록
          </Link>
        </li>
        <li>
          <Link
            to="/admin/lists/diy-prices"
            style={getLinkStyle('/admin/lists/diy-prices')}
          >
            응원 달성 Diy 목록
          </Link>
        </li>
        <li>
          <Link
            to="/admin/lists/products"
            style={getLinkStyle('/admin/lists/products')}
          >
            상품 목록
          </Link>
        </li>
        <li>
          <Link
            to="/admin/lists/pre-trips"
            style={getLinkStyle('/admin/lists/pre-trips')}
          >
            지난 여행 목록
          </Link>
        </li>
        <li>
          <Link
            to="/admin/lists/user-reviews"
            style={getLinkStyle('/admin/lists/user-reviews')}
          >
            회원 리뷰 목록
          </Link>
        </li>
        <li>
          <Link
            to="/admin/lists/members"
            style={getLinkStyle('/admin/lists/members')}
          >
            회원 목록
          </Link>
        </li>
      </ListMenu>
    </>
  );
};

export default AdminMenu;
