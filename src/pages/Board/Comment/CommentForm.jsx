import React, { useState } from 'react';
import apiClient from '../../../api/apiClient';
import styles from './CommentForm.module.css';

const CommentForm = ({ postNum, fetchComments, parentCommentNum, onSubmitSuccess }) => {
  const [newComment, setNewComment] = useState('');

  const handleCommentSubmit = async (e) => {
    e.preventDefault();
    try {
      const payload = { content: newComment };
      if (parentCommentNum) {
        payload.parentCommentNum = parentCommentNum;
      }
      await apiClient.post(`/posts/${postNum}/comments`, payload);
      setNewComment('');
      fetchComments();
      if (onSubmitSuccess) onSubmitSuccess();
    } catch (error) {
      console.error('Error posting comment:', error);
    }
  };

  return (
    <form onSubmit={handleCommentSubmit} className={styles.commentForm}>
      <button type="submit" className={styles.commentFormButton}>
        <span className={styles.text}>등록</span>
      </button>
      <textarea
        className={styles.commentFormTextarea}
        value={newComment}
        onChange={(e) => setNewComment(e.target.value)}
        placeholder="댓글을 입력하세요"
        required
      />
    </form>
  );
};

export default CommentForm;