import styles from './CommentSection.module.css';
import { useNavigate } from 'react-router-dom';
import { formatDateTime } from '../../../utils/DateTime';
import none from '../../../assets/images/none.jpg';

const Comment = ({
  boardNum,
  productImage,
  productName,
  userNickname,
  price,
  boardingDate,
  comingDate,
}) => {
  const navigate = useNavigate();

  return (
    <div className={styles.comment_container}>
      <div
        className={styles.comment_box}
        onClick={() => navigate(`/preTrip-detail/${boardNum}`)}
      >
  <div className={styles.comment_contents}>
          <img src={productImage || none} alt="썸네일" />
          
          <div className={styles.hover_box}>
          {/* <p className={styles.hover_text}>{userNickname} 님의 여행</p> */}

            <p className={styles.hover_textTitle}>{productName}</p>
            <p className={styles.hover_textDetail}>베트남에 쌀국수 먹으러 가요(상세설명)이게 내용이 더 길어지면 어떻게 되는거야?</p>
            <p className={styles.hover_text}>여행국가: 베트남(가져오기)</p>
            <p className={styles.hover_text}>{formatDateTime(boardingDate).replace(/\s\d{2}:\d{2}$/, '')} ~ {formatDateTime(comingDate).replace(/\s\d{2}:\d{2}$/, '')}</p>
            <p className={styles.hover_text}> ₩ {price}</p>
            <p className={styles.hover_text}>좋아요: 5</p> {/* 좋아요 개수 예시 */}
            <p className={styles.hover_text}>⭐️⭐️⭐️⭐️⭐️</p> {/* 리뷰 별점 가져오기 */}

          </div>
        </div>
        <div>
          <div className={styles.comment_details}>
          <p className={styles.comment_text}>#{productName}</p>
          <p>나라 이름</p>
          <p>{formatDateTime(boardingDate).replace(/\s\d{2}:\d{2}$/, '')} ~ {formatDateTime(comingDate).replace(/\s\d{2}:\d{2}$/, '')} </p>


          </div>
        </div>
      </div>
    </div>
  );
};

export default Comment;
