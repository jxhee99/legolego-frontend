import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import apiClient from '../../api/apiClient';
import CommuntyBoard from './CommuntyBoard';
import MyBoard from './MyBoard';
import PostList from './Post/PostList';
import styles from './Board.module.css';
import PaginationComp from '../../components/Pagination/PaginationComp';
import Metas from '../../components/common/Metas';

const Board = () => {
  const user = localStorage.getItem('role');
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
  const itemsPerPage = 10;
  const navigate = useNavigate();

  useEffect(() => {
    fetchAllPosts();
  }, [sortOrder, selectedCategory]);

  useEffect(() => {
    paginatePosts();
  }, [page, allPosts]);

  const fetchAllPosts = async () => {
    const url = getUrl(sortOrder, selectedCategory, setSearchKeyword);
    try {
      const response = await apiClient.get(url);
      setAllPosts(response.data);
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
    setSearchKeyword('');
    sessionStorage.removeItem('communitySearch');
    const searchParams = new URLSearchParams(location.search);
    searchParams.delete('searched');
    navigate('.', { replace: true });
  };

  const handleCreatePost = () => {
    navigate('/create-post');
  };

  const handleClickMy = async (my) => {
    sessionStorage.removeItem('communitySearch');
    setMy(my);
    await new Promise((resolve) => {
      setPage(1);
      resolve();
    });
    if (my) {
      setSortOrder('myPosts');
      setSelectedCategory('');
      setSearchKeyword('');
      sessionStorage.removeItem('communitySearch');
      const searchParams = new URLSearchParams(location.search);
      searchParams.delete('searched');
      navigate('.', { replace: true });
    } else {
      setSortOrder('all');
    }
  };

  return (
    <>
      <Metas title={'커뮤니티'} />
      <div className={styles.board_box}>
        <div className={styles.board}>
          {!user ? (
            <h2>ALL</h2>
          ) : (
            <>
              <h2 onClick={() => handleClickMy('')}>ALL</h2>
              <h2 onClick={() => handleClickMy('my')}>MY</h2>
            </>
          )}

          {my === 'my' ? (
            <MyBoard
              handleSortChange={handleSortChange}
              handleCreatePost={handleCreatePost}
              sortOrder={sortOrder}
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

          <PostList
            posts={posts}
            currentPage={page}
            itemsPerPage={itemsPerPage}
          />
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
      </div>
    </>
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

const getUrl = (sortOrder, selectedCategory, setSearchKeyword) => {
  let url = '/posts/all';

  const communitySearch = JSON.parse(sessionStorage.getItem('communitySearch'));
  const searchParams = new URLSearchParams(location.search);
  const searched = searchParams.get('searched');

  if (communitySearch && searched) {
    setSearchKeyword(communitySearch.keyWord);
    if (communitySearch.category) {
      url = `/posts/category/${communitySearch.category}/search?keyword=${communitySearch.keyWord}`;
    } else {
      url = `/posts/search?keyword=${communitySearch.keyWord}`;
    }
  } else {
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
  }

  return url;
};
