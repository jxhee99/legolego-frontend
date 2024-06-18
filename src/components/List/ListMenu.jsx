import React from 'react';
import { Outlet } from 'react-router-dom';
import styles from './ListMenu.module.css';

const ListMenu = ({ title, children }) => {
  return (
    <div className={styles.Box}>
      <div className={styles.menu}>
        <h2>{title}</h2>
        <ul>{children}</ul>
      </div>
      <Outlet></Outlet>
    </div>
  );
};

export default ListMenu;
