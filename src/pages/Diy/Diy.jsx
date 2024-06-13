import styles from './Diy.module.css';
import DiyCard from '../../components/Card/DiyCard/DiyCard';
import Avatar from '../../components/Avatar/Avatar';
import { getRandomElement } from '../../utils/random';

const titles = [
  'Exploring the Alps',
  'Journey to the Sahara',
  'Adventure in the Amazon',
  'Mystery of the Pyramids',
  'Escape to Bali',
  'Safari in Kenya',
  'Discover Japan',
];

const partnerNames = [
  'TravelCo',
  'Globetrotter',
  'Wanderlust',
  'Explorer',
  'VacationHub',
  'TourMaster',
  'WorldVoyage',
];

const userNames = ['Alice', 'Bob', 'Charlie', 'Dave', 'Eve', 'Faythe', 'Grace'];

const userProfileImages = [
  'https://randomuser.me/api/portraits/women/1.jpg',
  'https://randomuser.me/api/portraits/men/1.jpg',
  'https://randomuser.me/api/portraits/women/2.jpg',
  'https://randomuser.me/api/portraits/men/2.jpg',
  'https://randomuser.me/api/portraits/women/3.jpg',
  'https://randomuser.me/api/portraits/men/3.jpg',
  'https://randomuser.me/api/portraits/women/4.jpg',
];

const mock = Array.from({ length: 7 }, (_, index) => ({
  index: index + 1,
  imageUrl: 'https://picsum.photos/500/300',
  title: getRandomElement(titles),
  partnerName: getRandomElement(partnerNames),
  userName: getRandomElement(userNames),
  userProfileImage: getRandomElement(userProfileImages),
}));

const Diy = () => {
  return (
    <section className={`${styles.Diy} layout`}>
      <h2>DIY 패키지를 응원해주세요!</h2>
      <div className={styles.diy_cards}>
        {mock.map((item) => (
          <DiyCard
            page={true}
            userName={item.userName}
            key={item.index}
            imageUrl={item.imageUrl}
            title={item.title}
            partnerName={item.partnerName}
            user={
              <Avatar
                nickname={item.userName}
                imageUrl={item.userProfileImage}
              />
            }
          />
        ))}
      </div>
    </section>
  );
};

export default Diy;
