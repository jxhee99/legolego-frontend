import styles from './Package.module.css';
import { useState, useEffect } from 'react';
import axios from 'axios';
import PackageCard from '../../components/Card/PackageCard/PackageCard';
import Metas from '../../components/common/Metas';
import { useInView } from 'react-intersection-observer';

const Package = () => {
  const [allPackageData, setAllPackageData] = useState([]);
  const [displayedData, setDisplayedData] = useState([]);
  const [itemsToShow, setItemsToShow] = useState(10);

  const { ref, inView } = useInView({
    threshold: 1.0,
  });

  const fetchData = async () => {
    try {
      const response = await axios.get(`/api/products`);
      setAllPackageData(response.data);
      setDisplayedData(response.data.slice(0, 10));
    } catch (error) {
      console.error('Error', error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    if (inView) {
      setItemsToShow((prevItems) => prevItems + 10);
    }
  }, [inView]);

  useEffect(() => {
    setDisplayedData(allPackageData.slice(0, itemsToShow));
  }, [itemsToShow, allPackageData]);

  return (
    <>
      <Metas title="패키지 상품" />
      <section className={`${styles.Package} layout`}>
        <h2>어떤 여행을 함께 해볼까요?</h2>
        <div className={styles.package_cards}>
          {displayedData.map((packageItem) => (
            <PackageCard key={packageItem.productNum} {...packageItem} />
          ))}
        </div>
        <div ref={ref} className={styles.infiniteScrollTrigger}></div>
      </section>
    </>
  );
};

export default Package;
