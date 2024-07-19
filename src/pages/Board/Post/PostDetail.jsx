import React, { useState, useEffect, useContext } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import apiClient from '../../../api/apiClient';
import CommentForm from '../Comment/CommentForm';
import CommentList from '../Comment/CommentList';
import EditPostForm from './EditPostForm';
import { AuthContext } from '../../../contexts/AuthContext';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import VisibilityIcon from '@mui/icons-material/Visibility';
import ChatBubbleOutlineIcon from '@mui/icons-material/ChatBubbleOutline';
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
      console.log("Post detail fetched:", response.data);
    } catch (error) {
      console.error('Error fetching post detail:', error);
    }
  };

  const fetchComments = async () => {
    try {
      const response = await apiClient.get(`/posts/${postNum}/comments`);
      setComments(response.data);
      console.log("Comments fetched:", response.data);
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

  const isOwner =
    (role === 'USER' &&
      post.userNum !== null &&
      post.userNum.toString() === userNum) ||
    (role === 'PARTNER' &&
      post.partnerNum !== null &&
      post.partnerNum.toString() === userNum) ||
    (role === 'ADMIN' &&
      post.adminNum !== null &&
      post.adminNum.toString() === userNum);

  return (
    <div className={styles.postDetail}>
      {editing ? (
        <EditPostForm
          post={post}
          onUpdate={() => {
            setEditing(false);
            fetchPostDetail();
          }}
        />
      ) : (
        <>
          <div className={styles.postDetailCategory}>
            <span>{transformCategory(post.category)}</span>
            {isOwner && (
                <div className={styles.postDetailButtonGroup}>
                  <button onClick={() => navigate(`/edit-post/${postNum}`)} className={styles.postDetailEditButton}>                    
                    <EditIcon className={styles.postDetailEditIcon} fontSize="small" />
                  </button>
                  <button onClick={handleDeletePost} className={styles.postDetailDeleteButton}>
                    <DeleteIcon className={styles.postDetailDeleteIcon} fontSize="small" />
                  </button>
                </div>
              )}
              {role === 'ADMIN' && !isOwner && (
              <button onClick={handleDeletePost} className={styles.postDetailAdminDeleteBtn}>
                <DeleteIcon className={styles.postDetailAdminDeleteBtn} fontSize="small" />
              </button>
            )}
          </div>
          <h1 className={styles.postDetailTitle}>{post.title}</h1>
          <div className={styles.postDetails}>
            <div className={styles.postDetailLeft}>
              <span>
                {post.userNickname
                  ? `${post.userNickname}`
                  : post.companyName
                    ? `${post.companyName}`
                    : `${post.adminName}`}
              </span>
              <span>{post.regDate}</span>
            </div>
            <div className={styles.postDetailRight}>
              <span>
                <VisibilityIcon className={styles.postDetailViewIcon} />{' '}
                {post.viewCount}
              </span>
              <span>
                <ChatBubbleOutlineIcon
                  className={styles.postDetailCommentIcon}
                />{' '}
                {post.commentCount}
              </span>
            </div>
          </div>
          <div className={styles.postDetailDivider}></div>
          <pre className={styles.postDetailContent}>{post.content}</pre>
          <div className={styles.postDetailDivider}></div>
        </>
      )}
      <CommentForm postNum={postNum} fetchComments={fetchComments} />
      <CommentList
        comments={comments}
        postNum={postNum}
        fetchComments={fetchComments}
      />
    </div>
  );
};

export default PostDetail;

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
