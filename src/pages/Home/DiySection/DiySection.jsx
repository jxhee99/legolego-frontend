import styles from '../Home.module.css';
import DiyCard from '../../../components/Card/DiyCard/DiyCard';
import Avatar from '../../../components/Avatar/Avatar';
import { getRandomElement } from '../../../utils/random';

const userProfileImages = [
  'https://randomuser.me/api/portraits/women/1.jpg',
  'https://randomuser.me/api/portraits/men/1.jpg',
  'https://randomuser.me/api/portraits/women/2.jpg',
  'https://randomuser.me/api/portraits/men/2.jpg',
  'https://randomuser.me/api/portraits/women/3.jpg',
  'https://randomuser.me/api/portraits/men/3.jpg',
  'https://randomuser.me/api/portraits/women/4.jpg',
];

const userNames = ['Alice', 'Bob', 'Charlie', 'Dave', 'Eve', 'Faythe', 'Grace'];

const DiySection = () => {
  return (
    <section className={styles.DiySection}>
      <h2>방금 올라온 DIY 패키지</h2>
      <div className={styles.diy_section_cards}>
        <DiyCard
          imageUrl="https://picsum.photos/500/300"
          title="문화재 위주로 다니는 여행"
          user={
            <Avatar
              nickname={getRandomElement(userNames)}
              imageUrl={getRandomElement(userProfileImages)}
            />
          }
        />
      </div>
    </section>
  );
};

export default DiySection;
