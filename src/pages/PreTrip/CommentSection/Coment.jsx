import styles from './CommentSection.module.css';

const Coment = ({
  boardNum,
  ProductImage,
  ProductName,
  price,
  boardingDate,
  comingDate,
  userNickname,
}) => {
  return (
    <div className={styles.comment_container}>
      <div className={styles.comment_box}>
        <div className={styles.comment_profile}>
          <p> 프로필</p>
        </div>
        <hr></hr>
        <div className={styles.comment_contents}>
          <p>후기내용</p>
        </div>
      </div>
    </div>
  );
};

export default Coment;
