import React from 'react';
import CommentItem from './CommentItem';
import styles from './CommentList.module.css';

const CommentList = ({ comments, postNum, fetchComments }) => {
  return (
    <div className={styles.commentList}>
      {comments.map(comment => (
        <CommentItem key={comment.commentNum} comment={comment} postNum={postNum} fetchComments={fetchComments} />
      ))}
    </div>
  );
};

export default CommentList;