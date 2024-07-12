import React, { useState, useEffect, useContext } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import apiClient from '../../../api/apiClient';
import CommentForm from '../Comment/CommentForm';
import CommentList from '../Comment/CommentList';
import EditPostForm from './EditPostForm';
import { AuthContext } from '../../../contexts/AuthContext';
import styles from './PostDetail.module.css';

const PostDetail = () => {
  const { postNum } = useParams();
  const { userNum, role } = useContext(AuthContext);
  const [post, setPost] = useState(null);
  const [comments, setComments] = useState([]);
  const [editing, setEditing] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    fetchPostDetail();
    fetchComments();
  }, [postNum]);

  const fetchPostDetail = async () => {
    try {
      const response = await apiClient.get(`/posts/${postNum}`);
      setPost(response.data);
    } catch (error) {
      console.error('Error fetching post detail:', error);
    }
  };

  const fetchComments = async () => {
    try {
      const response = await apiClient.get(`/posts/${postNum}/comments`);
      setComments(response.data);
    } catch (error) {
      console.error('Error fetching comments:', error);
    }
  };

  const handleDeletePost = async () => {
    try {
      await apiClient.delete(`/posts/${postNum}`);
      navigate('/board');
    } catch (error) {
      console.error('Error deleting post:', error);
    }
  };

  if (!post) return <div>Loading...</div>;

  console.log('userNum:', userNum, 'role:', role);
  console.log('post:', post);

  const isOwner =
    (role === 'USER' && post.userNum !== null && post.userNum.toString() === userNum) ||
    (role === 'PARTNER' && post.partnerNum !== null && post.partnerNum.toString() === userNum) ||
    (role === 'ADMIN' && post.adminNum !== null && post.adminNum.toString() === userNum);

  console.log('isOwner:', isOwner);

  return (
    <div className={styles.postDetail}>
      {editing ? (
        <EditPostForm post={post} onUpdate={() => { setEditing(false); fetchPostDetail(); }} />
      ) : (
        <>
          <h1>{post.title}</h1>
          <div className={styles.postMeta}>
            <div>작성자: {post.userNickname ? `${post.userNickname}` : post.companyName ? `${post.companyName}` : `${post.adminName}`}</div>
            <div>조회수: {post.viewCount}</div>
            <div>댓글수: {post.commentCount}</div>
          </div>
          <p>{post.content}</p>
          {isOwner && (
            <>
              <button onClick={() => setEditing(true)} className={styles.editButton}>수정</button>
              <button onClick={handleDeletePost} className={styles.deleteButton}>삭제</button>
            </>
          )}
          {role === 'ADMIN' && !isOwner && (
            <button onClick={handleDeletePost} className={styles.deleteButton}>삭제</button>
          )}
        </>
      )}
      <CommentList comments={comments} postNum={postNum} fetchComments={fetchComments} />
      <CommentForm postNum={postNum} fetchComments={fetchComments} />
    </div>
  );
};

export default PostDetail;