// import React from 'react';
// import { useNavigate } from 'react-router-dom';
// import styles from './PostList.module.css';

// const PostList = ({ posts, currentPage, itemsPerPage }) => {
//   const navigate = useNavigate();
  
//   const handlePostClick = (postNum) => {
//     navigate(`/posts/${postNum}`);
//   };

//   return (
//     <div className={styles.postList}>
//       {posts.map((post, index) => (
//         <div key={post.postNum} className={styles.postItem} onClick={() => handlePostClick(post.postNum)}>
//           <div>
//             <h2>{`${(currentPage - 1) * itemsPerPage + index + 1} ${post.title}`}</h2>
//             <div className={styles.postMeta}>
//               <div>
//                 {post.userNickname ? post.userNickname : post.companyName ? post.companyName : post.adminName}
//               </div>
//               <div className={styles.icon}><i className="fa fa-eye" aria-hidden="true"></i> {post.viewCount}</div>
//               <div className={styles.icon}><i className="fa fa-comments" aria-hidden="true"></i> {post.commentCount}</div>
//             </div>
//           </div>
//         </div>
//       ))}
//     </div>
//   );
// };

// export default PostList;

// import React from 'react';
// import { useNavigate } from 'react-router-dom';
// import styles from './PostList.module.css';

// const PostList = ({ posts, currentPage, itemsPerPage }) => {
//   const navigate = useNavigate();

//   const handlePostClick = (postNum) => {
//     navigate(`/posts/${postNum}`);
//   };

//   return (
//     <div className={styles.postList}>
//       <table className={styles.postTable}>
//         <thead>
//           <tr>
//             <th>No</th>
//             <th>제목</th>
//             <th>글쓴이</th>
//             <th>조회수</th>
//             <th>댓글수</th>
//           </tr>
//         </thead>
//         <tbody>
//           {posts.map((post, index) => (
//             <tr key={post.postNum} onClick={() => handlePostClick(post.postNum)} className={styles.postRow}>
//               <td>{(currentPage - 1) * itemsPerPage + index + 1}</td>
//               <td>{post.title}</td>
//               <td>{post.userNickname ? post.userNickname : post.companyName ? post.companyName : post.adminName}</td>
//               <td>{post.viewCount}</td>
//               <td>{post.commentCount}</td>
//             </tr>
//           ))}
//         </tbody>
//       </table>
//     </div>
//   );
// };

// export default PostList;

import React from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './PostList.module.css';

const PostList = ({ posts, currentPage, itemsPerPage }) => {
  const navigate = useNavigate();
  
  const handlePostClick = (postNum) => {
    navigate(`/posts/${postNum}`);
  };

  return (
    <table className={styles.postTable}>
      <thead>
        <tr>
          <th>No</th>
          <th>제목</th>
          <th>작성자</th>
          <th>조회수</th>
          <th>댓글수</th>
          <th>작성일</th>
        </tr>
      </thead>
      <tbody>
        {posts.map((post, index) => (
          <tr key={post.postNum} onClick={() => handlePostClick(post.postNum)}>
            <td>{(currentPage - 1) * itemsPerPage + index + 1}</td>
            <td>{post.title}</td>
            <td>{post.userNickname || post.companyName || post.adminName}</td>
            <td>{post.viewCount}</td>
            <td>{post.commentCount}</td>
            <td>{post.regDate}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default PostList;