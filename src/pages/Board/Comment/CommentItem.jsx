import React, { useState, useContext } from 'react';
import { AuthContext } from '../../../contexts/AuthContext';
import apiClient from '../../../api/apiClient';
import CommentForm from './CommentForm';
import styles from './CommentItem.module.css';

const CommentItem = ({ comment, postNum, fetchComments, isReply = false }) => {
  const { userNum, role } = useContext(AuthContext);
  const [showReplyForm, setShowReplyForm] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [newContent, setNewContent] = useState(comment.content);

  const isCommentOwner =
    (role === 'USER' && comment.userNum && comment.userNum.toString() === userNum) ||
    (role === 'PARTNER' && comment.partnerNum && comment.partnerNum.toString() === userNum) ||
    (role === 'ADMIN' && comment.adminNum && comment.adminNum.toString() === userNum);

  const isAdmin = role === 'ADMIN';

  const handleReplyClick = () => {
    setShowReplyForm(!showReplyForm);
  };

  const handleEdit = async () => {
    try {
      await apiClient.patch(`/posts/comments/${comment.commentNum}`, { content: newContent });
      setIsEditing(false);
      fetchComments();
    } catch (error) {
      console.error('Error updating comment:', error);
    }
  };

  const handleDelete = async () => {
    try {
      await apiClient.delete(`/posts/{postNum}/comments/${comment.commentNum}`);
      fetchComments();
    } catch (error) {
      console.error('Error deleting comment:', error);
    }
  };

  return (
    <div className={`${styles.commentItem} ${isReply ? styles.replyItem : ''}`}>
      <div className={styles.commentMeta}>
        <div>{comment.userNickname ? `${comment.userNickname}` : comment.companyName ? `${comment.companyName}` : `${comment.adminName}`}</div>
        <div>{comment.regDate}</div>
      </div>
      {isEditing ? (
        <>
          <textarea
            value={newContent}
            onChange={(e) => setNewContent(e.target.value)}
            required
          />
          <button onClick={handleEdit}>저장</button>
          <button onClick={() => setIsEditing(false)}>취소</button>
        </>
      ) : (
        <>
          <p>{comment.content}</p>
          {isCommentOwner && (
            <>
              <button onClick={() => setIsEditing(true)} className={styles.editButton}>수정</button>
              <button onClick={handleDelete} className={styles.deleteButton}>삭제</button>
            </>
          )}
          {isAdmin && !isCommentOwner && (
            <button onClick={handleDelete} className={styles.deleteButton}>삭제</button>
          )}
          <button onClick={handleReplyClick} className={styles.replyButton}>답글 달기</button>
        </>
      )}
      {showReplyForm && (
        <CommentForm postNum={postNum} parentCommentNum={comment.commentNum} fetchComments={fetchComments} />
      )}
      {comment.replies && comment.replies.map(reply => (
        <CommentItem key={reply.commentNum} comment={reply} postNum={postNum} fetchComments={fetchComments} isReply={true} />
      ))}
    </div>
  );
};

export default CommentItem;