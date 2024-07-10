import { Link, useLocation } from 'react-router-dom';
import styles from './FilterButtons.module.css';

const FilterButtons = () => {
  const location = useLocation();
  const currentTab = new URLSearchParams(location.search).get('filter');

  return (
    <aside className={styles.FilterButtons}>
      <button className={currentTab === 'search' ? styles.active : ''}>
        <Link to="/product?filter=search">전체</Link>
      </button>
      <button
        className={currentTab === 'recruitmentClose' ? styles.active : ''}
      >
        <Link to="/product?filter=recruitmentClose">모집임박</Link>
      </button>
      <button
        className={currentTab === 'sortByDeadlineDesc' ? styles.active : ''}
      >
        <Link to="/product?filter=sortByDeadlineDesc">마감임박</Link>
      </button>
      <button
        className={currentTab === 'recruitmentConfirmed' ? styles.active : ''}
      >
        <Link to="/product?filter=recruitmentConfirmed">모집확정</Link>
      </button>
      <button className={currentTab === 'sortByPoplar' ? styles.active : ''}>
        <Link to="/product?filter=sortByPoplar">인기순</Link>
      </button>
      <button className={currentTab === 'sortByPriceDesc' ? styles.active : ''}>
        <Link to="/product?filter=sortByPriceDesc">가격높은순</Link>
      </button>
      <button className={currentTab === 'sortByPriceAsc' ? styles.active : ''}>
        <Link to="/product?filter=sortByPriceAsc">가격낮은순</Link>
      </button>
    </aside>
  );
};

export default FilterButtons;
