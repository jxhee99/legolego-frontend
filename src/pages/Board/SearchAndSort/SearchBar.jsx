import React from 'react';
import styles from './SearchBar.module.css';

const SearchBar = ({
  selectedCategory,
  searchKeyword,
  setSearchKeyword,
  handleSearch,
}) => {
  return (
    <div className={styles.search}>
      <form onSubmit={handleSearch}>
        <input
          type="text"
          value={searchKeyword}
          onChange={(e) => {
            sessionStorage.removeItem('communitySearch');
            setSearchKeyword(e.target.value);
          }}
          placeholder={selectedCategory}
        />
        <button type="submit" className={styles.searchButton}>
          검색
        </button>
      </form>
    </div>
  );
};

export default SearchBar;
