import React, { useEffect, useState } from 'react';
import styles from './CardSlide.module.css';
import apiClient from '../../../api/apiClient';
import { useNavigate } from 'react-router-dom';
import FaceIcon from '@mui/icons-material/Face';
import Face2Icon from '@mui/icons-material/Face2';
import Face3Icon from '@mui/icons-material/Face3';
import Face4Icon from '@mui/icons-material/Face4';
import Face5Icon from '@mui/icons-material/Face5';
import Face6Icon from '@mui/icons-material/Face6';

const iconComponents = [FaceIcon, Face2Icon, Face3Icon, Face4Icon, Face5Icon, Face6Icon];

const CardSlide = () => {
  const [data, setData] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await apiClient.get('/reviews');
        console.log('cardslide', response);
        setData(response.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
    fetchData();
  }, []);

  const repeatedData = [...data, ...data, ...data, ...data, ...data];
  
  const renderStars = (rating) => {
    const roundedRating = Math.round(rating);
    if (roundedRating === 0) {
      return '💫';
    }
    return '⭐️'.repeat(roundedRating);
  };

  const getRandomIcon = () => {
    const randomIndex = Math.floor(Math.random() * iconComponents.length);
    const ChosenIcon = iconComponents[randomIndex];
    return <ChosenIcon style={{ fontSize: '0.8rem', color: '#888' }} />;
  };

  const truncateString = (str, maxLines) => {
    const lines = str.split('\n');
    if (lines.length > maxLines) {
      return lines.slice(0, maxLines).join('\n') + '...';
    }
    return str;
  };

  return (
    <div className={styles.slider}>
      <div className={styles['slide-track']}>
        {repeatedData.map((review, index) => (
          <div key={index} className={styles.slide}>
            <div
              className={styles['train-card']}
              onClick={() => navigate(`/preTrip-detail/${review.boardNum}`)}
            >
              <div className={styles.review}>
                <div className={styles.reviewPhoto}>
                  <img src={review.productImage} alt="Review" />
                </div>
                <div className={styles.reviewText}>
                  <p>{renderStars(review.rating)}</p>
                  <div className={styles.reviewNickname}>
                    {getRandomIcon()} {review.userNickname}님의 후기
                  </div>
                  <div className={styles.reviewContent}>
                    {truncateString(review.content, 3)} {/* 최대 3줄까지 표시 */}
                  </div>
                  <div className={styles.reviewProductName}>
                    {review.productName}
                  </div>
                  <div className={styles.reviewSmallText}>
                    {review.destination.split('/')[0]}
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CardSlide;
// import React, { useEffect, useState } from 'react';
// import styles from './CardSlide.module.css';
// import apiClient from '../../../api/apiClient';
// import { useNavigate } from 'react-router-dom';
// import FaceIcon from '@mui/icons-material/Face';
// import Face2Icon from '@mui/icons-material/Face2';
// import Face3Icon from '@mui/icons-material/Face3';
// import Face4Icon from '@mui/icons-material/Face4';
// import Face5Icon from '@mui/icons-material/Face5';
// import Face6Icon from '@mui/icons-material/Face6';

// const iconComponents = [FaceIcon, Face2Icon, Face3Icon, Face4Icon, Face5Icon, Face6Icon];

// const CardSlide = () => {
//   const [data, setData] = useState([]);
//   const navigate = useNavigate();

//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const response = await apiClient.get('/reviews');
//         console.log('cardslide', response);
//         setData(response.data);
//       } catch (error) {
//         console.error('Error fetching data:', error);
//       }
//     };
//     fetchData();
//   }, []);

//   const repeatedData = [...data, ...data, ...data, ...data, ...data];
  
//   const renderStars = (rating) => {
//     const roundedRating = Math.round(rating);
//     if (roundedRating === 0) {
//       return '💫';
//     }
//     return '⭐️'.repeat(roundedRating);
//   };

//   const getRandomIcon = () => {
//     const randomIndex = Math.floor(Math.random() * iconComponents.length);
//     const ChosenIcon = iconComponents[randomIndex];
//     return <ChosenIcon style={{ fontSize: '0.8rem', color: '#888' }} />;
//   };

//   const truncateString = (str, num) => {
//     if (str.length > num) {
//       return str.slice(0, num) + '···';
//     } else {
//       return str;
//     }
//   };

//   return (
//     <div className={styles.slider}>
//       <div className={styles['slide-track']}>
//         {repeatedData.map((review, index) => (
//           <div key={index} className={styles.slide}>
//             <div
//               className={styles['train-card']}
//               onClick={() => navigate(`/preTrip-detail/${review.boardNum}`)}
//             >
//               <div className={styles.review}>
//                 <div className={styles.reviewPhoto}>
//                   <img src={review.productImage} alt="Review" />
//                 </div>
//                 <div className={styles.reviewText}>
//                   <p>{renderStars(review.rating)}</p>
//                   <div className={styles.reviewNickname}>
//                     {getRandomIcon()} {review.userNickname}님의 후기
//                   </div>
//                   <div className={styles.reviewContent}>
//                     {truncateString(review.content, 59)} {/* 글자 수 제한 */}
//                   </div>
//                   <div className={styles.reviewProductName}>
//                     {review.productName}
//                   </div>
//                   <div className={styles.reviewSmallText}>
//                     {review.destination.split('/')[0]}
//                   </div>
//                 </div>
//               </div>
//             </div>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// };

// export default CardSlide;
// // import React, { useEffect, useState } from 'react';
// // import styles from './CardSlide.module.css';
// // import apiClient from '../../../api/apiClient';
// // import { useNavigate } from 'react-router-dom';
// // import FaceIcon from '@mui/icons-material/Face';
// // import Face2Icon from '@mui/icons-material/Face2';
// // import Face3Icon from '@mui/icons-material/Face3';
// // import Face4Icon from '@mui/icons-material/Face4';
// // import Face5Icon from '@mui/icons-material/Face5';
// // import Face6Icon from '@mui/icons-material/Face6';

// // const iconComponents = [FaceIcon, Face2Icon, Face3Icon, Face4Icon, Face5Icon, Face6Icon];

// // const CardSlide = () => {
// //   const [data, setData] = useState([]);
// //   const navigate = useNavigate(); // useNavigate 훅을 가져옴

// //   useEffect(() => {
// //     const fetchData = async () => {
// //       try {
// //         const response = await apiClient.get('/reviews');
// //         console.log('cardslide', response);
// //         setData(response.data);
// //       } catch (error) {
// //         console.error('Error fetching data:', error);
// //       }
// //     };
// //     fetchData();
// //   }, []);

// //   // 데이터 배열을 여러 번 반복하게 설정
// //   const repeatedData = [...data, ...data, ...data, ...data, ...data];
  
// //   // 별점 표시 함수
// //   const renderStars = (rating) => {
// //     const roundedRating = Math.round(rating);
// //     if (roundedRating === 0) {
// //       return '💫';
// //     }
// //     return '⭐️'.repeat(roundedRating);
// //   };

// //   // 아이콘 랜덤 선택 함수
// //   const getRandomIcon = () => {
// //     const randomIndex = Math.floor(Math.random() * iconComponents.length);
// //     const ChosenIcon = iconComponents[randomIndex];
// //     return <ChosenIcon style={{ fontSize: '0.8rem', color: '#888' }} />;
// //   };

// //   return (
// //     <div className={styles.slider}>
// //       <div className={styles['slide-track']}>
// //         {repeatedData.map((review, index) => (
// //           <div key={index} className={styles.slide}>
// //             <div
// //               className={styles['train-card']}
// //               onClick={() => navigate(`/preTrip-detail/${review.boardNum}`)} // 클릭 시 navigate 함수 호출
// //             >
// //               <div className={styles.review}>
// //                 <div className={styles.reviewPhoto}>
// //                   <img src={review.productImage} alt="Review" />
// //                 </div>
// //                 <div className={styles.reviewText}>
// //                   <p>{renderStars(review.rating)}</p> {/* 별점 표시 */}
// //                   <div className={styles.reviewNickname}>
// //                     {getRandomIcon()} {review.userNickname}님의 후기
// //                   </div>
// //                   <div className={styles.reviewContent}>
// //                     {review.content}
// //                   </div>
// //                   <div className={styles.reviewProductName}> 
// //                     {review.productName} {/* 목적지 앞부분만 표시 */}
// //                   </div>
// //                   <div className={styles.reviewSmallText}>
// //                     {review.destination.split('/')[0]}
// //                   </div>
// //                 </div>
// //               </div>
// //             </div>
// //           </div>
// //         ))}
// //       </div>
// //     </div>
// //   );
// // };

// // export default CardSlide;