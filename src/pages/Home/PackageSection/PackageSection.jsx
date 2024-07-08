import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from '../Home.module.css';
import axios from 'axios';
import ProductProcessCard from '../../../components/Card/ProductProcessCard/ProductProcessCard';

const PackageSection = () => {
  const [packageData, setPackageData] = useState([]);
  const navigate = useNavigate();

  const fetchData = async () => {
    try {
      const response = await axios.get(`/api/products`);
      console.log(response.data);
      setPackageData(response.data);
    } catch (error) {
      console.error('Error', error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  // recruitmentDeadline이 임박한 순으로 정렬하고 상위 4개 항목만 선택
  // const sortedPackageData = packageData
  //   .sort((a, b) => new Date(a.recruitmentDeadline) - new Date(b.recruitmentDeadline))
  //   .slice(0, 4); // 배열의 처음에서 4개의 항목 선택

  // (새 사진 사용하려고 만든거임!!!! 위에거가 맞음)
  // recruitmentDeadline이 임박한 순으로 정렬하고 최하위 4개 항목만 선택
  const sortedPackageData = packageData
    .sort((a, b) => new Date(b.recruitmentDeadline) - new Date(a.recruitmentDeadline))
    .slice(0, 4);

  return (
    <section className={styles.PackageSection}>
      <div className={styles.package_title}>
        <h2>🚀 레고러들이 선택한 여행에 참여하기</h2>
        <button
          className={styles.more_button}
          onClick={() => navigate('/package-product')}
        >
          더보러가기
        </button>
      </div>
      <div className={styles.blank} />
      <div className={styles.container}>
        <ul id="cards">
          {sortedPackageData.map((packageItem, index) => (
            <li className={styles.card} key={index} id={`card${index + 1}`}>
              <div className={styles['card-body']}>
                <ProductProcessCard key={packageItem.productNum} {...packageItem} />
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
};

export default PackageSection;
// import { useState, useEffect } from 'react';
// import { useNavigate } from 'react-router-dom';
// import styles from '../Home.module.css';
// import axios from 'axios';
// import ProductProcessCard from '../../../components/Card/ProductProcessCard/ProductProcessCard';

// const PackageSection = () => {
//   const [packageData, setPackageData] = useState([]);
//   const navigate = useNavigate();

//   const fetchData = async () => {
//     try {
//       const response = await axios.get(`/api/products`);
//       console.log(response.data);
//       setPackageData(response.data);
//     } catch (error) {
//       console.error('Error', error);
//     }
//   };

//   useEffect(() => {
//     fetchData();
//   }, []);

//   // recruitmentDeadline이 임박한 순으로 정렬하고 상위 4개 항목만 선택
//   // const sortedPackageData = packageData
//   // .sort((a, b) => new Date(a.recruitmentDeadline) - new Date(b.recruitmentDeadline))
//   // .slice(0, 4); // 배열의 처음에서 4개의 항목 선택


//   //  (새 사진 사용하려고 만든거임!!!! 위에거가 맞음)
// // recruitmentDeadline이 임박한 순으로 정렬하고 최하위 4개 항목만 선택
// const sortedPackageData = packageData
//   .sort((a, b) => new Date(b.recruitmentDeadline) - new Date(a.recruitmentDeadline))
//   .slice(0, 4);



//   return (
//     <section className={styles.PackageSection}>
//       <div className={styles.package_title}>
//         <h2>🚀 레고러들이 선택한 여행에 참여하기</h2>
//         <button
//           className={styles.more_button}
//           onClick={() => navigate('/package-product')}
//         >
//           더보러가기
//         </button>
//       </div>
//       <div className={styles.blank}/>
//       <div className={styles.container}>
//         <ul id="cards">
//           {sortedPackageData.map((packageItem, index) => (
//             <li className={styles.card} key={index} id={`card${index + 1}`}>
//               <div className={styles['card-body']}>
//                 <ProductProcessCard key={packageItem.productNum} {...packageItem} />
//               </div>
//             </li>
//           ))}
//         </ul>
//       </div>
//     </section>
//   );
// };

// export default PackageSection;
