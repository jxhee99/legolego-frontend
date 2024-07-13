import React, { useState, useContext } from 'react';
import { AuthContext } from '../../../contexts/AuthContext';
import apiClient from '../../../api/apiClient';
import CommentForm from './CommentForm';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
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
      await apiClient.patch(`/posts/${postNum}/comments/${comment.commentNum}`, { content: newContent });
      setIsEditing(false);
      fetchComments();
    } catch (error) {
      console.error('Error updating comment:', error);
    }
  };

  const handleDelete = async () => {
    try {
      await apiClient.delete(`/posts/${postNum}/comments/${comment.commentNum}`);
      fetchComments();
    } catch (error) {
      console.error('Error deleting comment:', error);
    }
  };

  const handleReplySuccess = () => {
    setShowReplyForm(false);
  };

  return (
    <div className={`${styles.commentItem} ${isReply ? styles.replyItem : ''}`}>
      <div className={styles.commentHeader}>
        <div className={styles.commentAuthor}>{comment.userNickname ? `${comment.userNickname}` : comment.companyName ? `${comment.companyName}` : `${comment.adminName}`}</div>
        <div className={styles.commentActions}>
          {isCommentOwner && (
            <>
              <EditIcon className={styles.commentItemEditBtn} onClick={() => setIsEditing(true)} />
              <DeleteIcon className={styles.commentItemDeleteBtn} onClick={handleDelete} />
            </>
          )}
          {isAdmin && !isCommentOwner && (
            <DeleteIcon className={styles.deleteButton} onClick={handleDelete} />
          )}
        </div>
      </div>
      <div className={styles.commentContent}>
        {isEditing ? (
          <>
            <textarea
              className={styles.commentItemTextarea}
              value={newContent}
              onChange={(e) => setNewContent(e.target.value)}
              required
            />
            <button onClick={handleEdit} className={styles.commentItemSaveBtn}>저장</button>
            <button onClick={() => setIsEditing(false)} className={styles.commentItemCancelBtn}>취소</button>
          </>
        ) : (
          <p>{comment.content}</p>
        )}
      </div>
      <div className={styles.commentFooter}>
        <span className={styles.commentDate}>{comment.regDate}</span>
        <button onClick={handleReplyClick} className={styles.replyButton}>답글쓰기</button>
      </div>
      {showReplyForm && (
        <CommentForm postNum={postNum} parentCommentNum={comment.commentNum} fetchComments={fetchComments} onSubmitSuccess={handleReplySuccess} />
      )}
      {comment.replies && comment.replies.map(reply => (
        <CommentItem key={reply.commentNum} comment={reply} postNum={postNum} fetchComments={fetchComments} isReply={true} />
      ))}
    </div>
  );
};

export default CommentItem;