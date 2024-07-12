import React, { useState } from 'react';
import styles from './SortButton.module.css';

const categories = [
  '동행모집',
  '여행문의',
  '여행 팁',
  '여행 경로',
  '공지사항',
  '이벤트 & 할인',
];

const SortButtons = ({
  type,
  selectedCategory,
  onSortChange,
  onCategoryChange,
}) => {
  const activeClass = (category) => {
    if (selectedCategory === category) {
      return styles.active;
    }
    return '';
  };

  const handleCategorySelect = (category) => {
    onSortChange('category');
    onCategoryChange(category);
    // setShowCategories(false);
  };

  return (
    <div className={styles.all_box}>
      {type === 'my' ? (
        <div className={styles.sort}>
          <button onClick={() => onSortChange('myPosts')}>내 글</button>
          <button onClick={() => onSortChange('myComments')}>내 댓글</button>
        </div>
      ) : (
        <>
          <div className={styles.category}>
            <button className={styles.all} onClick={() => onSortChange('all')}>
              All
            </button>
            {categories.map((category) => (
              <button
                key={category}
                className={activeClass(category)}
                onClick={() => handleCategorySelect(category)}
              >
                {category}
              </button>
            ))}
          </div>
          <div className={styles.sort}>
            <button onClick={() => onSortChange('latest')}>최신순</button>
            <button onClick={() => onSortChange('oldest')}>오래된순</button>
          </div>
        </>
      )}
    </div>
  );
};

export default SortButtons;
