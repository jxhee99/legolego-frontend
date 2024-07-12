import React from 'react';
import styles from './Board.module.css';
import SortButtons from './SearchAndSort/SortButtons';

const MyBoard = ({ handleCreatePost, sortOrder, handleSortChange }) => {
  return (
    <>
      <div className={styles.search_create}>
        <button onClick={handleCreatePost} className={styles.createPostButton}>
          작성하기
        </button>
      </div>

      <div>
        <SortButtons type={'my'} onSortChange={handleSortChange} />
      </div>
    </>
  );
};

export default MyBoard;
