import styles from './DiyItem.module.css';

const DiyItem = ({ title, imageUrl }) => {
  return (
    <div className={styles.DiyItem}>
      <div className={styles.diy_item_image}>
        <img src={imageUrl} alt="구글이미지" />
      </div>
      <h4>{title}</h4>
      <input type="text" placeholder="메모를 입력하세요" />
    </div>
  );
};

export default DiyItem;
