import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './TopReviewCardSlide.module.css';
import apiClient from '../../../api/apiClient';

const TopReviewCardSlide = () => {
  const [topReview, setTopReview] = useState([]); // 초기값을 빈 배열로 설정
  const navigate = useNavigate(); // useNavigate 훅을 가져옴

  useEffect(() => {
    const fetchTopReview = async () => {
      try {
        const reviewResponse = await apiClient.get('/pre-trip/rating');
        console.log('topReview', reviewResponse);

        // 데이터를 확인하여 처리
        const reviewData = reviewResponse.data; // 여기서 data를 추출
        if (Array.isArray(reviewData)) {
          // 별점 높은 순으로 정렬
          reviewData.sort((a, b) => b.avgRating - a.avgRating);
          // 상위 4개만 가져오기
          const topFourReviews = reviewData.slice(0, 4);
          setTopReview(topFourReviews);
        } else {
          console.error('topReview is not an array:', reviewData);
        }
      } catch (error) {
        console.error('Error fetching top review data:', error);
      }
    };
    fetchTopReview();
  }, []);

  // 별점 표시 함수
  const renderStars = (rating) => {
    const roundedRating = Math.round(rating);
    if (roundedRating === 0) {
      return '💫';
    }
    return '⭐️'.repeat(roundedRating);
  };

  return (
    <div className={styles.TripCircle}>
        {topReview.map((review, index) => (
          // <div key={index} className={styles.stopSlide}>
            <div 
              // className={styles['train-card']} 
              onClick={() => navigate(`/preTrip-detail/${review.boardNum}`)} // 클릭 시 navigate 함수 호출
            >
              <div className={styles.review}>
                <div className={styles.reviewPhoto}>
                  <img src={review.productImage} alt="Review" />
                </div>
                <div className={styles.reviewText}>
                  <p>{renderStars(review.avgRating)}</p> {/* 별점 표시 */}
                  <p>{review.productName}</p>
                  <p className={styles.reviewSmallText}>{review.destination.split('/')[0]}</p> {/* 목적지 앞부분만 표시 */}
                </div>
              </div>
            </div>
          // </div>
        ))}
      </div>
  
  );
};

export default TopReviewCardSlide;