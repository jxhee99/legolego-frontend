import React from 'react';
import styles from './Board.module.css';
import SearchBar from './SearchAndSort/SearchBar';
import SortButtons from './SearchAndSort/SortButtons';
import { transformCategory } from './Board';
import apiClient from '../../api/apiClient';

const CommuntyBoard = ({
  selectedCategory,
  searchKeyword,
  setSearchKeyword,
  setSelectedCategory,
  handleCreatePost,
  sortOrder,
  setAllPosts,
  setPage,
  handleSortChange,
}) => {
  const handleCategoryChange = (category) => {
    setSearchKeyword('');
    setSelectedCategory(category);
  };

  const handleSearch = async (e) => {
    e.preventDefault();
    let url = `/posts/search?keyword=${searchKeyword}`;

    if (selectedCategory) {
      const category = transformCategory(selectedCategory);
      url = `/posts/category/${category}/search?keyword=${searchKeyword}`;
    }

    try {
      const response = await apiClient.get(url);
      setAllPosts(response.data);
      setPage(1);
    } catch (error) {
      console.error('Error searching posts:', error);
    }
  };

  return (
    <>
      <div className={styles.search_create}>
        <SearchBar
          selectedCategory={selectedCategory}
          searchKeyword={searchKeyword}
          setSearchKeyword={setSearchKeyword}
          handleSearch={handleSearch}
        />
        <button onClick={handleCreatePost} className={styles.createPostButton}>
          작성하기
        </button>
      </div>

      <div>
        <SortButtons
          selectedCategory={selectedCategory}
          onSortChange={handleSortChange}
          onCategoryChange={handleCategoryChange}
        />
      </div>
    </>
  );
};

export default CommuntyBoard;
