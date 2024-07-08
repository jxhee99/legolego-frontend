import styles from './ProductProcessCard.module.css';

const ProductProcessCard = ({
  image,
  title,
  category,
  price,
  date,
  progress,
}) => {
  return (
    <div className={styles.ProductProcessCard}>
      <div className={styles.imageContainer}>
        <img src={image} alt={title} className={styles.image} />
      </div>
      <div className={styles.content}>
        <h2 className={styles.title}>{title}</h2>
        <p className={styles.category}>{category}</p>
        <p className={styles.price}>{price.toLocaleString()} 원</p>
        <p className={styles.date}>{date}</p>
        <div className={styles.progressContainer}>
          <div
            className={styles.progressBar}
            style={{ width: `${progress}%` }}
          ></div>
        </div>
        <p className={styles.progressText}>{progress}/25 명 참여</p>
        <button className={styles.button}>마감 임박!</button>
      </div>
    </div>
  );
};

export default ProductProcessCard;
