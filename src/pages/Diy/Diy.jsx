import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import styles from './Diy.module.css';
import useFetchData from '../../hooks/useFetchDiyData';
import DiyCard from '../../components/Diy/DiyCard';
import SearchInput from '../../components/SearchInput/SearchInput';
import Metas from '../../components/common/Metas';
import PaginationComp from '../../components/Pagination/PaginationComp';
import DiyFilterButton from './DiyFilterButton';
import { setSearchData, setOverLikeData } from '../../_slices/searchDiySlice';

const Diy = () => {
  const userRole = localStorage.getItem('role');
  const query = new URLSearchParams(location.search);
  const initialPage = parseInt(query.get('page')) || 1;
  const isSearched = query.get('searched');
  const isFiltered = query.get('filtered');
  const [page, setPage] = useState(initialPage);
  const [isSortedByPopularity, setIsSortedByPopularity] = useState(false);

  const itemsPerPage = 12;
  const endpoint = '/packages';
  const navigate = useNavigate();
  const dispatch = useDispatch();

  // Redux 상태에서 searchData 가져오기
  const searchData = useSelector((state) => state.search.searchData);
  const overLikeData = useSelector((state) => state.search.overLikeData);

  const { data, loading, error, setData, refetch } = useFetchData(endpoint);

  const [isScrolled, setIsScrolled] = useState(false);

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
  }, []);

  if (loading) {
    return <p>로딩 중...</p>;
  }

  if (error) {
    return <p>데이터를 불러오는 중 오류가 발생했습니다.</p>;
  }

  const startIndex = (page - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  let currentItems = data.slice(startIndex, endIndex);

  const handleSort = () => {
    // 인기순 정렬 상태 toggle
    setIsSortedByPopularity((prev) => !prev);
  };
  // 데이터 렌더링 로직에서 isSortedByPopularity 상태에 따라 정렬된 데이터를 보여줄지 원래 상태를 보여줄지 결정
  let itemsToDisplay = [];

  if (isSortedByPopularity) {
    // 인기순 정렬된 데이터를 보여줄 때
    if (isSearched && isFiltered) {
      itemsToDisplay = searchData
        .filter((item) =>
          overLikeData.some(
            (likeItem) => likeItem.packageNum === item.packageNum
          )
        )
        .slice()
        .sort((a, b) => b.packageLikedNum - a.packageLikedNum)
        .slice(startIndex, endIndex);
    } else if (isSearched) {
      itemsToDisplay = searchData
        .slice()
        .sort((a, b) => b.packageLikedNum - a.packageLikedNum)
        .slice(startIndex, endIndex);
    } else if (isFiltered) {
      itemsToDisplay = overLikeData
        .slice()
        .sort((a, b) => b.packageLikedNum - a.packageLikedNum)
        .slice(startIndex, endIndex);
    } else {
      itemsToDisplay = data
        .slice()
        .sort((a, b) => b.packageLikedNum - a.packageLikedNum)
        .slice(startIndex, endIndex);
    }
  } else {
    // 원래 데이터 상태를 보여줄 때
    if (isSearched && isFiltered) {
      itemsToDisplay = searchData
        .filter((item) =>
          overLikeData.some(
            (likeItem) => likeItem.packageNum === item.packageNum
          )
        )
        .slice(startIndex, endIndex);
    } else if (isSearched) {
      itemsToDisplay = searchData.slice(startIndex, endIndex);
    } else if (isFiltered) {
      itemsToDisplay = overLikeData.slice(startIndex, endIndex);
    } else {
      itemsToDisplay = data.slice(startIndex, endIndex);
    }
  }

  // 인기순 버튼의 텍스트 토글
  const popularityButtonText = isSortedByPopularity ? '최신순' : '인기순';

  return (
    <>
      <Metas title="DIY" />
      <div
        className={`${styles.diyBackground} ${isScrolled ? styles.scrolled : ''}`}
      >
        {userRole === 'USER' && (
          <button
            className={`${styles.create_button} ${isScrolled ? styles.scrolled : ''}`}
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
        <p className={`${isScrolled ? styles.scrolled : ''}`}>
          내 맘대로 떠나는 DIY 패키지 만들러 레고 ~
        </p>
      </div>
      <section
        className={`${styles.Diy} ${isScrolled ? styles.scrolledBackground : ''}`}
      >
        <div className={`layout ${styles.main_box}`}>
          <h2>DIY 패키지를 응원해주세요!</h2>
          <div className={styles.search_filter}>
            <SearchInput />
            <DiyFilterButton setData={setData} />
            <button onClick={handleSort}>{popularityButtonText}</button>
          </div>
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
        <div className={styles.pagination_box}>
          <PaginationComp
            page={page}
            setPage={setPage}
            totalItems={itemsToDisplay.length}
            itemsPerPage={itemsPerPage}
          />
        </div>
      </section>
    </>
  );
};

export default Diy;
