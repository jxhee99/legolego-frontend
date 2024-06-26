import styles from './PreTripComment.module.css';
import Avatar from '../../../components/Avatar/Avatar';

const PreTripComment = () => {
  return (
    <div className={styles.PreTripComment}>
      <h2 className={styles.comment_header}>LEGOLEGO 여행 후기</h2>
      <div className={styles.comment_container}>
        <div className={styles.comment_box}>
            <div className={styles.comment_profile}>
              <p> 프로필</p> 
                {/* <Avatar
              nickname={packages.user.userName}
              imageUrl={packages.profileImg}
            /> */}
            </div>
            <hr></hr>
            <div className={styles.comment_contents}>
            <p>후기내용</p>
            </div>


        </div>

        <div className={styles.comment_box}></div>
        <div className={styles.comment_box}></div>
      </div>
    </div>
  );
};

export default PreTripComment;
