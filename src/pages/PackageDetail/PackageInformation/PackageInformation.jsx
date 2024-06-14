import styles from '../PackageDetail.module.css';

const PackageInformation = () => {
  return (
    <section className={styles.PackageInformation}>
      <div className={styles.package_information_left}>
        <img src="https://picsum.photos/400 " alt="상품이미지" />
      </div>
      <div className={styles.package_information_right}>
        <h2>Lorem, ipsum dolor sit amet consectetur adipisicing.</h2>
        <p>하나투어</p>
        <p>9박 10일 여행이 99만 9999원!</p>
        <div className={styles.progress_bar}>
          <div className={styles.progress_bar_inner}></div>
        </div>
        <button>레고! 결제하기</button>
      </div>
    </section>
  );
};

export default PackageInformation;
