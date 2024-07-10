import { Link, useLocation } from 'react-router-dom';
import styles from './FilterButtons.module.css';

const FilterButtons = () => {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const currentTab = searchParams.get('filter');

  const isAllActive = location.pathname === '/product' && !currentTab;

  return (
    <aside className={styles.FilterButtons}>
      <button className={isAllActive ? styles.active : ''}>
        <Link to="/product">전체</Link>
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
      <button className={currentTab === 'sortByPopular' ? styles.active : ''}>
        <Link to="/product?filter=sortByPopular">인기순</Link>
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
