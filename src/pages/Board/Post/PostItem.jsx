import React from 'react';
import { Link } from 'react-router-dom';

const PostItem = ({ post }) => {
  return (
    <div>
      <h2>
        <Link to={`/board/${post.postNum}`}>{post.title}</Link>
      </h2>
      <p>{post.content}</p>
      <p>작성자: {post.userNickname ? `${post.userNickname}` : post.companyName ? `${post.companyName}` : `${post.adminName}`}</p>
      <p>조회수: {post.viewCount}</p>
      <p>댓글수: {post.commentCount}</p>
    </div>
  );
};

export default PostItem;