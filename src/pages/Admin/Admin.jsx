import React from 'react';
import { Link, Outlet } from 'react-router-dom';
import styles from './Admin.module.css';

const Admin = () => {
  return (
    <div className={styles.Admin}>
      <div className={styles.menu}>
        <h2>
          <Link to="/admin">관리자 페이지</Link>
        </h2>
        <ul>
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
        </ul>
      </div>
      <Outlet></Outlet>
    </div>
  );
};

export default Admin;
