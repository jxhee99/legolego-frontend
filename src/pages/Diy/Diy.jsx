import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import styles from './Diy.module.css';
import useFetchData from '../../hooks/useFetchDiyData';
import DiyCard from '../../components/Diy/DiyCard';
import SearchInput from './SearchInput/SearchInput';
import Metas from '../../components/common/Metas';
import PaginationComp from '../../components/Pagination/PaginationComp';
import DiyFilterButton from './DiyFilterButton';
import { filterItems, sortByPopularity } from '../../utils/filterAndSort';

const Diy = () => {
  // URL 쿼리 매개변수에서 page, isSearched, isFiltered 가져오기
  const query = new URLSearchParams(location.search);
  const initialPage = parseInt(query.get('page')) || 1;
  const isSearched = query.get('searched');
  const isFiltered = query.get('filtered');

  // 상태 초기화
  const [page, setPage] = useState(initialPage);
  const [isSortedByPopularity, setIsSortedByPopularity] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  // 필요한 훅, 변수 설정
  const userRole = localStorage.getItem('role');
  const navigate = useNavigate();
  const searchData = useSelector((state) => state.search.searchData);
  const overLikeData = useSelector((state) => state.search.overLikeData);
  const { data, loading, error, setData } = useFetchData('/packages');

  //검색 상태와 스크롤 관리
  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    if (searchData.length < 1) {
      searchParams.delete('searched');
      navigate(`${location.pathname}?${searchParams.toString()}`);
    }

    const handleScroll = () => {
      setIsScrolled(window.scrollY > 0);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [navigate, searchData.length]);

  // 로딩 중 및 오류 처리
  if (loading) {
    return <p>로딩 중...</p>;
  }

  if (error) {
    return <p>데이터를 불러오는 중 오류가 발생했습니다.</p>;
  }

  // 페이지당 아이템 개수 설정
  const itemsPerPage = 12;
  const startIndex = (page - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  let totalData;

  // 정렬 상태에 따른 아이템 표시 로직
  let itemsToDisplay = [];
  if (isSortedByPopularity) {
    if (isSearched && isFiltered) {
      itemsToDisplay = sortByPopularity(
        filterItems(searchData, overLikeData)
      ).slice(startIndex, endIndex);
      totalData = filterItems(searchData, overLikeData).length;
    } else if (isSearched) {
      itemsToDisplay = sortByPopularity(searchData).slice(startIndex, endIndex);
      totalData = searchData.length;
    } else if (isFiltered) {
      itemsToDisplay = sortByPopularity(overLikeData).slice(
        startIndex,
        endIndex
      );
      totalData = overLikeData.length;
    } else {
      itemsToDisplay = sortByPopularity(data).slice(startIndex, endIndex);
      totalData = data.length;
    }
  } else {
    if (isSearched && isFiltered) {
      itemsToDisplay = filterItems(searchData, overLikeData).slice(
        startIndex,
        endIndex
      );
      totalData = filterItems(searchData, overLikeData).length;
    } else if (isSearched) {
      itemsToDisplay = searchData.slice(startIndex, endIndex);
      totalData = searchData.length;
    } else if (isFiltered) {
      itemsToDisplay = overLikeData.slice(startIndex, endIndex);
      totalData = overLikeData.length;
    } else {
      itemsToDisplay = data.slice(startIndex, endIndex);
      totalData = data.length;
    }
  }

  // 버튼 텍스트 및 인기순 정렬 핸들링
  const popularityButtonText = isSortedByPopularity ? '최신순' : '인기순';
  const handleSort = () => {
    setPage(1);
    setIsSortedByPopularity((prev) => !prev);
  };

  return (
    <>
      <Metas title="DIY" />
      {/* 스크롤 관련 */}
      <div
        className={`${styles.diyBackground} ${isScrolled ? styles.scrolled : ''}`}
      >
        {/* 사용자 역할에 따른 버튼 */}
        {userRole === 'USER' && (
          <button
            className={`${styles.create_button} ${isScrolled ? styles.scrolled : ''}`}
            onClick={() => {
              navigate('/diy-create');
            }}
          >
            {isScrolled ? (
              <>
                <div className={styles.left}>
                  <div className={styles.title}>
                    내 맘대로 떠나는 DIY 패키지 만들러 ‘ 레고 ’
                  </div>
                  <div className={styles.description}>
                    내가 짠 일정대로 패키지를 만들어준다고? 레고레고와 함께 자체
                    제작 패키지를 만들어 보세요!
                  </div>
                </div>
                <div className={styles.divider}></div>
                <div className={styles.right}>
                  <Link to="/diy-create">제작하기 ✏️</Link>
                </div>
              </>
            ) : (
              <Link to="/diy-create">
                <span className={styles.make}>제작하기 ✏️</span>
              </Link>
            )}
          </button>
        )}
        {/* 스크롤 관련 문구 */}
        <p className={`${isScrolled ? styles.scrolled : ''}`}>
          내 맘대로 떠나는 DIY 패키지 만들러 레고 ~
        </p>
      </div>
      {/* DIY 섹션 */}
      <section
        className={`${styles.Diy} ${isScrolled ? styles.scrolledBackground : ''}`}
      >
        <div className={`layout ${styles.main_box}`}>
          <h2>🎉 DIY 패키지를 응원해주세요!</h2>
          {/* 검색과 필터링 */}
          <div className={styles.search_filter}>
            <SearchInput setPage={setPage} />
            <div className={styles.filter_order}>
              <DiyFilterButton setPage={setPage} />
              {/* 정렬 버튼 */}
              <button onClick={handleSort}>{popularityButtonText}</button>
            </div>
          </div>
          {/* DIY 카드들 */}
          <div className={styles.diy_cards}>
            {itemsToDisplay.map((packages) => (
              <div key={packages.packageNum}>
                <h4 style={{ marginBottom: '1.5rem', textAlign: 'center' }}>
                  <strong>{packages.user.userName}</strong>님의 여행 둘러보세요!
                </h4>
                <DiyCard {...packages} page={true} />
              </div>
            ))}
          </div>
        </div>
        {/* 페이지네이션 */}
        <div className={styles.pagination_box}>
          <PaginationComp
            page={page}
            setPage={setPage}
            totalItems={totalData}
            itemsPerPage={itemsPerPage}
          />
        </div>
      </section>
    </>
  );
};

export default Diy;
