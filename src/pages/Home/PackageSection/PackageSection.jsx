import styles from '../Home.module.css';
import PackageCard from '../../../components/Card/PackageCard/PackageCard';

const PackageSection = () => {
  return (
    <section className={styles.PackageSection}>
      <h2>레고러들이 선택한 여행에 참여하기</h2>
      <div className={styles.package_section_cards}>
        <PackageCard
          imageUrl="https://picsum.photos/400/400"
          title="lorem ipsum......."
          partnerName="하나투어"
        />
      </div>
    </section>
  );
};

export default PackageSection;
