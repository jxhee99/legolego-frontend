import Box from '@mui/material/Box';
import Rating from '@mui/material/Rating';
import styles from './PreTripComment.module.css';
import { formatDateTime } from '../../../utils/DateTime';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

const PreTripComment = ({ reviews }) => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    centerMode: true,
    centerPadding: '60px',
    autoplay: true,
    autoplaySpeed: 3000,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
          centerPadding: '40px',
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 1,
          centerPadding: '20px',
        },
      },
    ],
  };

  const renderReview = (review, index) => (
    <div key={index} className={styles.reviewSlide}>
      <article>
        <header className={styles.reviewHeader}>
          <h3 className={styles.reviewAuthor}>{review.userNickname}</h3>
          <time className={styles.reviewDate}>
            {formatDateTime(review.createDate).replace(/\s\d{2}:\d{2}$/, '')}
          </time>
        </header>
        <div className={styles.reviewContent}>
          <Box>
            <Rating name="read-only" value={review.rating} readOnly />
          </Box>
          <p>{review.content}</p>
        </div>
      </article>
    </div>
  );

  return (
    <section className={styles.reviewSection}>
      <h2 className={styles.reviewTitle}>여행 후기</h2>
      {reviews.length === 1 ? (
        renderReview(reviews[0], 0)
      ) : (
        <Slider {...settings} className={styles.reviewSlider}>
          {reviews.map((review, index) => renderReview(review, index))}
        </Slider>
      )}
    </section>
  );
};

export default PreTripComment;
