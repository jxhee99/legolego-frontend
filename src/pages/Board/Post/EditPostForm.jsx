import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import apiClient from '../../../api/apiClient';
import styles from './PostForm.module.css';

const categories = [
  'RECRUITMENT',
  'INQUIRY',
  'TIP',
  'ROUTE',
  'NOTICE',
  'EVENT'
];

const EditPostForm = () => {
  const { postNum } = useParams();
  const [post, setPost] = useState(null);
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [category, setCategory] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    fetchPostDetail();
  }, [postNum]);

  const fetchPostDetail = async () => {
    try {
      const response = await apiClient.get(`/posts/${postNum}`);
      setPost(response.data);
      setTitle(response.data.title);
      setContent(response.data.content);
      setCategory(response.data.category);
    } catch (error) {
      console.error('Error fetching post detail:', error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await apiClient.patch(`/posts/${postNum}`, { title, content, category });
      navigate(`/board`);
    } catch (error) {
      console.error('Error updating post:', error);
    }
  };

  if (!post) return <div>Loading...</div>;

  return (
    <div className={styles.postFormContainer}>
      <h1 className={styles.postFormTitle}>게시글 수정</h1>
      <form onSubmit={handleSubmit}>
        <div className={styles.createPost}>
          <label htmlFor="title">제목</label>
          <input
            type="text"
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </div>
        <div className={styles.createPost}>
          <label htmlFor="category">카테고리</label>
          <select
            id="category"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            required
          >
            <option value="" disabled>카테고리를 선택해주세요</option>
            {categories.map((cat) => (
              <option key={cat} value={cat}>{transformCategory(cat)}</option>
            ))}
          </select>
        </div>
        <div className={styles.createPost}>
          <label htmlFor="content">내용</label>
          <textarea
            id="content"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            required
          ></textarea>
        </div>
        <div className={styles.postFormBtn}>
          <button type="submit" className={styles.postFormSubmitBtn}>수정</button>
          <button type="button" className={styles.postFormCancelBtn} onClick={() => navigate(-1)}>취소</button>
        </div>
      </form>
    </div>
  );
};

export default EditPostForm;

const transformCategory = (category) => {
  switch (category) {
    case 'RECRUITMENT':
      return '동행문의';
    case 'INQUIRY':
      return '여행문의';
    case 'TIP':
      return '여행 팁';
    case 'ROUTE':
      return '여행 경로';
    case 'NOTICE':
      return '공지사항';
    case 'EVENT':
      return '이벤트 & 할인';
    default:
      return category; // 만약 매칭되는 값이 없으면 원래 값을 반환
  }
};