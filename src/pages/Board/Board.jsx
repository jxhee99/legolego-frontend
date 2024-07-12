import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import apiClient from '../../api/apiClient';
import CommuntyBoard from './CommuntyBoard';
import MyBoard from './MyBoard';
import PostList from './Post/PostList';
import styles from './Board.module.css';
import PaginationComp from '../../components/Pagination/PaginationComp';

const Board = () => {
  const query = new URLSearchParams(location.search);
  const initialPage = parseInt(query.get('page')) || 1;
  const initialFilter = query.get('filter') || '';

  const [allPosts, setAllPosts] = useState([]);
  const [posts, setPosts] = useState([]);
  const [page, setPage] = useState(initialPage);
  const [sortOrder, setSortOrder] = useState('category');
  const [selectedCategory, setSelectedCategory] = useState(initialFilter);
  const [searchKeyword, setSearchKeyword] = useState('');
  const [my, setMy] = useState('');
  const itemsPerPage = 1;
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
      if (selectedCategory) {
        const category = transformCategory(selectedCategory);
        url = `/posts/category/${category}`;
      } else {
        url = '/posts/all';
      }
    } else if (sortOrder === 'oldest') {
      if (selectedCategory) {
        const category = transformCategory(selectedCategory);
        url = `/posts/category/${category}/oldest`;
      } else {
        url = '/posts/oldest';
      }
    } else if (sortOrder === 'myPosts') {
      url = '/posts/my-posts';
    } else if (sortOrder === 'myComments') {
      url = '/posts/my-comments';
    } else if (sortOrder === 'category' && selectedCategory) {
      const category = transformCategory(selectedCategory);
      url = `/posts/category/${category}`;
    }

    try {
      const response = await apiClient.get(url);
      setAllPosts(response.data);
      console.log(page);
      setPage(initialPage);
    } catch (error) {
      console.error('Error fetching posts:', error);
    }
  };

  const paginatePosts = () => {
    const startIndex = (page - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    setPosts(allPosts.slice(startIndex, endIndex));
  };

  const handleSortChange = async (order) => {
    await new Promise((resolve) => {
      setPage(1);
      resolve();
    });
    if (order === 'all') {
      setSelectedCategory('');
    }
    setSortOrder(order);
  };

  const handleCreatePost = () => {
    navigate('/create-post');
  };

  const handleClickMy = async (my) => {
    setMy(my);
    await new Promise((resolve) => {
      setPage(1);
      resolve();
    });
    if (my) {
      setSortOrder('myPosts');
    } else {
      setSortOrder('all');
    }
  };

  return (
    <div className={styles.board}>
      <h2 onClick={() => handleClickMy('')}>ALL</h2>
      <h2 onClick={() => handleClickMy('my')}>MY</h2>
      {my === 'my' ? (
        <MyBoard
          handleSortChange={handleSortChange}
          handleCreatePost={handleCreatePost}
        />
      ) : (
        <CommuntyBoard
          selectedCategory={selectedCategory}
          searchKeyword={searchKeyword}
          setSearchKeyword={setSearchKeyword}
          setSelectedCategory={setSelectedCategory}
          handleCreatePost={handleCreatePost}
          sortOrder={sortOrder}
          setAllPosts={setAllPosts}
          setPage={setPage}
          handleSortChange={handleSortChange}
        />
      )}

      <PostList posts={posts} currentPage={page} itemsPerPage={itemsPerPage} />
      <div className={styles.pagenation_box}>
        <PaginationComp
          page={page}
          setPage={setPage}
          totalItems={allPosts.length}
          itemsPerPage={itemsPerPage}
          filterApplied={sortOrder === 'category' ? selectedCategory : ''}
        />
      </div>
    </div>
  );
};

export default Board;

export const transformCategory = (category) => {
  switch (category) {
    case '동행모집':
      return 'RECRUITMENT';
    case '여행문의':
      return 'INQUIRY';
    case '여행 팁':
      return 'TIP';
    case '여행 경로':
      return 'ROUTE';
    case '공지사항':
      return 'NOTICE';
    case '이벤트 & 할인':
      return 'EVENT';
    default:
      return category; // 만약 매칭되는 값이 없으면 원래 값을 반환
  }
};
