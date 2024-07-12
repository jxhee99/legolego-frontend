import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import apiClient from '../../api/apiClient';
import SortButtons from './SortButtons';
import PostList from './Post/PostList';
import styles from './Board.module.css';
import PaginationComp from '../../components/Pagination/PaginationComp';

const Board = () => {
  const [allPosts, setAllPosts] = useState([]);
  const [posts, setPosts] = useState([]);
  const [page, setPage] = useState(1);
  const [sortOrder, setSortOrder] = useState('all');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [searchKeyword, setSearchKeyword] = useState('');
  const itemsPerPage = 10;
  const navigate = useNavigate();

  useEffect(() => {
    fetchAllPosts();
  }, [sortOrder, selectedCategory, searchKeyword]);

  useEffect(() => {
    paginatePosts();
  }, [page, allPosts]);

  const fetchAllPosts = async () => {
    let url = '/posts/all';

    if (sortOrder === 'latest') {
      url = '/posts/all';
    } else if (sortOrder === 'oldest') {
      url = '/posts/oldest';
    } else if (sortOrder === 'myPosts') {
      url = '/posts/my-posts';
    } else if (sortOrder === 'myComments') {
      url = '/posts/my-comments';
    } else if (sortOrder === 'category' && selectedCategory) {
      url = `/posts/category/${selectedCategory}`;
    }

    try {
      const response = await apiClient.get(url);
      setAllPosts(response.data);
      setPage(1);
    } catch (error) {
      console.error('Error fetching posts:', error);
    }
  };

  const paginatePosts = () => {
    const startIndex = (page - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    setPosts(allPosts.slice(startIndex, endIndex));
  };

  const handleSortChange = (order) => {
    setSortOrder(order);
  };

  const handleCategoryChange = (category) => {
    setSelectedCategory(category);
  };

  const handleSearch = async () => {
    try {
      const response = await apiClient.get(`/posts/search?keyword=${searchKeyword}`);
      setAllPosts(response.data);
      setPage(1);
    } catch (error) {
      console.error('Error searching posts:', error);
    }
  };

  const handleCreatePost = () => {
    navigate('/create-post');
  };

  return (
    <div className={styles.board}>
      <div className={styles.actions}>
        <input
          type="text"
          value={searchKeyword}
          onChange={(e) => setSearchKeyword(e.target.value)}
          placeholder="검색어를 입력하세요"
        />
        <button onClick={handleSearch}>검색</button>
        <button onClick={handleCreatePost} className={styles.createPostButton}>
          작성하기
        </button>
      </div>
      <SortButtons onSortChange={handleSortChange} onCategoryChange={handleCategoryChange} />
      <PostList posts={posts} currentPage={page} itemsPerPage={itemsPerPage} />
      <PaginationComp
        page={page}
        setPage={setPage}
        totalItems={allPosts.length}
        itemsPerPage={itemsPerPage}
        filterApplied={sortOrder === 'category' ? selectedCategory : ''}
      />
    </div>
  );
};

export default Board;