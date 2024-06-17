import styles from './DiyItem.module.css';

const DiyItem = ({ title, imageUrl, detail }) => {
  return (
    <div className={styles.DiyItem}>
      <div className={styles.diy_item_image}>
        <img src={imageUrl} alt="구글이미지" />
      </div>
      <h4>{title}</h4>
      {!detail ? (
        <input type="text" placeholder="메모를 입력하세요" />
      ) : (
        <p>공항도착</p>
      )}
    </div>
  );
};

export default DiyItem;
