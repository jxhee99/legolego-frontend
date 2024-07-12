import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import apiClient from '../../../api/apiClient';
import styles from './PostForm.module.css';

const PostForm = () => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [category, setCategory] = useState('RECRUITMENT');
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await apiClient.post('/posts', {
        title,
        content,
        category,
      });

      // 게시글 작성 성공 시 게시판 페이지로 이동
      if (response.status === 201) {
        navigate('/board');
      }
    } catch (error) {
      console.error('Error creating post:', error);
    }
  };

  return (
    <div className={styles.postFormContainer}>
      <h1>게시글 작성</h1>
      <form onSubmit={handleSubmit}>
        <div className={styles.formGroup}>
          <label htmlFor="title">제목</label>
          <input
            type="text"
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </div>
        <div className={styles.formGroup}>
          <label htmlFor="category">카테고리</label>
          <select
            id="category"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            required
          >
            <option value="RECRUITMENT">동행모집</option>
            <option value="INQUIRY">여행문의</option>
            <option value="TIP">여행 팁</option>
            <option value="ROUTE">여행 경로 공유</option>
            <option value="NOTICE">공지사항</option>
            <option value="EVENT">이벤트 및 할인 정보</option>
          </select>
        </div>
        <div className={styles.formGroup}>
          <label htmlFor="content">내용</label>
          <textarea
            id="content"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            required
          ></textarea>
        </div>
        <button type="submit" className={styles.submitButton}>작성하기</button>
      </form>
    </div>
  );
};

export default PostForm;