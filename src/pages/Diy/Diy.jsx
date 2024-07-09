import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import styles from './Diy.module.css';
import useFetchData from '../../hooks/useFetchDiyData';
import DiyCard from '../../components/Diy/DiyCard';
import Metas from '../../components/common/Metas';
import PaginationComp from '../../components/Pagination/PaginationComp';

const Diy = () => {
  const userRole = localStorage.getItem('role');
  const query = new URLSearchParams(location.search);
  const initialPage = parseInt(query.get('page')) || 1;
  const [page, setPage] = useState(initialPage);
  const itemsPerPage = 12;
  const endpoint = '/packages';

  const { data, loading } = useFetchData(endpoint);

  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 0) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  if (loading) {
    return <p>로딩 중...</p>;
  }

  const startIndex = (page - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentItems = data.slice(startIndex, endIndex);

  return (
    <>
      <Metas title="DIY" />
      <div
        className={`${styles.diyBackground} ${isScrolled ? styles.scrolled : ''}`}
      >
        {userRole === 'USER' && (
          <button className={`${styles.create_button} ${isScrolled ? styles.scrolled : ''}`}>
            {isScrolled ? (
              <>
                <div className={styles.left}>
                  <div className={styles.title}>내 맘대로 떠나는 DIY 패키지 만들러 ‘ 레고 ’</div>
                  <div className={styles.description}>내가 짠 일정대로 패키지를 만들어준다고? 레고레고와 함께 자체 제작 패키지를 만들어 보세요!</div>
                </div>
                <div className={styles.divider}></div>
                <div className={styles.right}>
                  <Link to="/diy-create">제작하기 ✏️</Link>
                </div>
              </>
            ) : (
              <Link to="/diy-create"><span className={styles.make}>제작하기 ✏️</span></Link>
            )}
          </button>
        )}
        <p className={`${isScrolled ? styles.scrolled : ''}`}>내 맘대로 떠나는 DIY 패키지 만들러 레고 ~</p>
      </div>
      <section className={`${styles.Diy} ${isScrolled ? styles.scrolledBackground : ''}`}>
        <div className={`layout`}>
          <h2>DIY 패키지를 응원해주세요!</h2>
          <div className={styles.diy_cards}>
            {currentItems.map((packages) => (
              <div key={packages.packageNum}>
                <h4 style={{ marginBottom: '1.5rem', textAlign: 'center' }}>
                  <strong>{packages.user.userName}</strong>님의 여행 둘러보세요!
                </h4>
                <DiyCard {...packages} page={true} />
              </div>
            ))}
          </div>
        </div>
        <div className={styles.pagination_box}>
          <PaginationComp
            page={page}
            setPage={setPage}
            totalItems={data.length}
            itemsPerPage={itemsPerPage}
          />
        </div>
      </section>
    </>
  );
};

export default Diy;