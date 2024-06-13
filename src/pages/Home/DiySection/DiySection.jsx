import styles from './DiySection.module.css';
import DiyCard from '../../../components/Card/DiyCard/DiyCard';
import Avatar from '../../../components/Avatar/Avatar';

const DiySection = () => {
  return (
    <section className={styles.DiySection}>
      <h2>방금 올라온 DIY 패키지</h2>
      <div className={styles.diy_section_cards}>
        <DiyCard
          imageUrl="https://picsum.photos/300/200"
          title="문화재 위주로 다니는 여행"
          user={
            <Avatar
              nickname="test123"
              imageUrl="https://picsum.photos/seed/helloworld/200/100"
            />
          }
        />
      </div>
    </section>
  );
};

export default DiySection;
