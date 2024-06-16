import styles from './Package.module.css';
import { useState, useEffect } from 'react';
import PackageCard from '../../components/Card/PackageCard/PackageCard';

const getRandomElement = (arr) => arr[Math.floor(Math.random() * arr.length)];

const Package = () => {
  // TODO packageData redux로 전역상태관리 하기
  const [packageData, setPackageData] = useState([]);

  useEffect(() => {
    fetch('/packages', {
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
    })
      .then((res) => res.json())
      .then((data) => setPackageData(data));
  }, []);

  console.log(packageData);

  return (
    <section className={`${styles.Package} layout`}>
      <h2>어떤 여행을 함께 해볼까요?</h2>
      <div className={styles.package_cards}>
        {packageData.map((item) => (
          <PackageCard
            key={item.packageNum}
            imageUrl={item.imageUrl}
            title={item.shortDescription}
            partnerName="하나투어"
          />
        ))}
      </div>
    </section>
  );
};

export default Package;
