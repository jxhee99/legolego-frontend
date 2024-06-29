import styles from './Diy.module.css';
import { useState } from 'react';
import { Link } from 'react-router-dom';
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
  const endpoint = '/api/packages';

  // 데이터 훅을 이용해 API 호출
  const { data, loading } = useFetchData(endpoint);

  if (loading) {
    return <p>로딩 중...</p>;
  }

  // 현재 페이지에 맞는 데이터 계산
  const startIndex = (page - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentItems = data.slice(startIndex, endIndex);

  return (
    <>
      <Metas title="DIY" />
      <section className={`${styles.Diy} layout`}>
        {userRole === 'USER' && (
          <button className={styles.create_button}>
            <Link to="/diy-create">패키지 만들기</Link>
          </button>
        )}
        <h2>DIY 패키지를 응원해주세요!</h2>
        <div className={styles.diy_cards}>
          {currentItems.map((packages) => (
            <div key={packages.packageNum}>
              <h4 style={{ marginBottom: '1.5rem', textAlign: 'center' }}>
                {packages.user.userName}님의 여행 둘러보세요!
              </h4>
              <DiyCard {...packages} page={true} />
            </div>
          ))}
        </div>
      </section>
      <div className={styles.pagination_box}>
        {/* 페이지네이션 컴포넌트 */}
        <PaginationComp
          page={page}
          setPage={setPage}
          totalItems={data.length}
          itemsPerPage={itemsPerPage}
        />
      </div>
    </>
  );
};

export default Diy;
