import styles from './Package.module.css';
import PackageCard from '../../components/Card/PackageCard/PackageCard';

// Function to get a random element from an array
const getRandomElement = (arr) => arr[Math.floor(Math.random() * arr.length)];

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

const mock = Array.from({ length: 7 }, (_, index) => ({
  index: index + 1,
  imageUrl: 'https://picsum.photos/400/400',
  title: getRandomElement(titles),
  partnerName: getRandomElement(partnerNames),
}));

const Package = () => {
  return (
    <section className={`${styles.Package} layout`}>
      <h2>어떤 여행을 함께 해볼까요?</h2>
      <div className={styles.package_cards}>
        {mock.map((item) => (
          <PackageCard
            key={item.index}
            imageUrl={item.imageUrl}
            title={item.title}
            partnerName={item.partnerName}
          />
        ))}
      </div>
    </section>
  );
};

export default Package;
