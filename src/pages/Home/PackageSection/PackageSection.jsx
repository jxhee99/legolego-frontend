import styles from './PackageSection.module.css';
import PackageCard from '../../../components/Card/PackageCard/PackageCard';

const PackageSection = () => {
  return (
    <section className={styles.PackageSection}>
      <h2>레고러들이 선택한 여행에 참여하기</h2>
      <div>
        <PackageCard
          imageUrl="https://picsum.photos/200/300"
          title="lorem ipsum......."
          partnerName="하나투어"
        />
      </div>
    </section>
  );
};

export default PackageSection;
