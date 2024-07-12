import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import apiClient from '../../../api/apiClient';
import styles from './EditPostForm.module.css';

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
    <form onSubmit={handleSubmit} className={styles.editPostForm}>
      <div>
        <label htmlFor="title">제목</label>
        <input
          type="text"
          id="title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
      </div>
      <div>
        <label htmlFor="content">내용</label>
        <textarea
          id="content"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          required
        ></textarea>
      </div>
      <div>
        <label htmlFor="category">카테고리</label>
        <select
          id="category"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          required
        >
          {categories.map((cat) => (
            <option key={cat} value={cat}>{cat}</option>
          ))}
        </select>
      </div>
      <button type="submit" className={styles.submitButton}>수정하기</button>
      <button type="button" className={styles.cancelButton} onClick={() => navigate(-1)}>취소</button>
    </form>
  );
};

export default EditPostForm;