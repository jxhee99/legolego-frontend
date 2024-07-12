import React, { useState } from 'react';

const categories = [
  'RECRUITMENT',
  'INQUIRY',
  'TIP',
  'ROUTE',
  'NOTICE',
  'EVENT',
];

const SortButtons = ({ onSortChange, onCategoryChange }) => {
  const [showCategories, setShowCategories] = useState(false);

  const handleCategoryClick = () => {
    setShowCategories(!showCategories);
  };

  const handleCategorySelect = (category) => {
    onSortChange('category');
    onCategoryChange(category);
    setShowCategories(false);
  };

  return (
    <div>
      <button onClick={() => onSortChange('all')}>전체</button>
      <button onClick={() => onSortChange('latest')}>최신순</button>
      <button onClick={() => onSortChange('oldest')}>오래된순</button>
      <button onClick={handleCategoryClick}>카테고리</button>
      {showCategories && (
        <div>
          {categories.map((category) => (
            <button key={category} onClick={() => handleCategorySelect(category)}>
              {category}
            </button>
          ))}
        </div>
      )}
      <button onClick={() => onSortChange('myPosts')}>내가 쓴 글</button>
      <button onClick={() => onSortChange('myComments')}>내가 댓글 단 글</button>
    </div>
  );
};

export default SortButtons;