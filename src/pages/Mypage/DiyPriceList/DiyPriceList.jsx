import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import styles from '../../../components/List/List.module.css';
import style from '../Mypage.module.css';
import ToggleFilter from '../../../components/ToggleFilter/ToggleFilter';
import PaginationComp from '../../../components/Pagination/PaginationComp';
import ListModal from '../../../components/List/Modal/ListModal';
import ConfirmModal from '../../../components/List/Modal/ConfirmModal';
import PriceDetail from '../../../components/List/PriceDetail/PriceDetail';
import SelectPrice from '../../../components/List/SelectPrice/SelectPrice';
import useFetchData from '../../../hooks/useFetchDiyData';

const DiyPriceList = () => {
  const location = useLocation();

  // 초기 상태와 변수 설정
  const query = new URLSearchParams(location.search);
  const initialPage = parseInt(query.get('page')) || 1;
  const initialFilter = query.get('filter') || '';
  const itemsPerPage = 10;

  // 상태관리
  const [modalOpen, setModalOpen] = useState(false);
  const [modalType, setModalType] = useState(null);
  const [selectedItem, setSelectedItem] = useState(null);
  const [filter, setFilter] = useState(initialFilter); // filter 상태 추가
  const [page, setPage] = useState(initialPage);

  // get 요청
  const endpoint = '/api/user/diylists';
  const { data, loading, error, refetch } = useFetchData(endpoint);

  // 로딩 중일 때
  if (loading) {
    return <div>Loading...</div>;
  }

  // 에러 발생 시
  if (error) {
    return <div>데이터를 불러오는 중 오류가 발생했습니다.</div>;
  }
  // 데이터가 없을 때
  if (!data || data.length === 0) {
    return <div>데이터가 없습니다.</div>;
  }

  // 필터된 데이터 설정
  let filteredData = [...data];
  if (filter === 'suggest') {
    filteredData = data.filter((item) => item.isSelected === null);
  } else if (filter === 'product') {
    filteredData = data.filter((item) => item.isRegistered === true);
  }

  // 현재 페이지에 맞는 데이터 계산
  const startIndex = (page - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentItems = filteredData.slice(startIndex, endIndex);

  // 모달 열기
  const openModal = (item, type) => {
    setSelectedItem(item);
    setModalType(type);
    setModalOpen(true);
  };

  // 모달 닫기
  const closeModal = () => {
    setSelectedItem(null);
    setModalType(null);
    setModalOpen(false);
  };

  // 필터 설정
  const handleChange = (event, newFilter) => {
    if (newFilter === filter) {
      setFilter('');
      setPage(1);
    } else {
      setFilter(newFilter);
      setPage(1);
    }
  };

  // 필터 토글 버튼
  const toggleButtons = [
    { value: 'suggest', label: '제안' },
    { value: 'product', label: '상품' },
  ];

  return (
    <>
      <ToggleFilter
        filter={filter}
        handleChange={handleChange}
        setFilter={setFilter}
        buttons={toggleButtons}
      />
      <div className={style.tableContainer}>
        <table className={style.table}>
          <thead>
            <tr>
              <th>패키지 번호</th>
              <th>Name</th>
              <th>Partner</th>
              <th>가격</th>
              <th>상세</th>
              <th>제안받기</th>
              <th>상품등록</th>
            </tr>
          </thead>
          <tbody>
            {currentItems.map((item) => (
              <tr key={item.listNum}>
                <td>{item.diyPackage.packageNum}</td>
                <td>
                  <Link to={`/diy/${item.diyPackage.packageNum}`}>
                    {item.diyPackage.packageName}
                  </Link>
                </td>
                <td>{item.partner.companyName}</td>
                <td>{item.price}</td>
                <td onClick={() => openModal(item, '제안 상세')}>
                  <button>보기</button>
                </td>
                <td>
                  {item.isSelected === null && (
                    <button onClick={() => openModal(item, '제안 받기')}>
                      받기
                    </button>
                  )}
                  {item.isSelected === true && <span>수락</span>}
                  {item.isSelected === false && <span>거절</span>}
                </td>
                <td>
                  {item.isRegistered && (
                    <Link to={`/package-product/${item.productNum}`}>완료</Link>
                  )}
                  {item.isSelected === true && item.isRegistered === false && (
                    <span>대기중</span>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {modalType === '제안 상세' && (
        <ListModal
          isVisible={modalOpen}
          closeModal={closeModal}
          title="제안 상세"
        >
          <PriceDetail selectedItem={selectedItem} />
        </ListModal>
      )}
      {modalType === '제안 받기' && selectedItem && (
        <ConfirmModal isVisible={modalOpen} closeModal={closeModal}>
          <SelectPrice
            selectedItem={selectedItem}
            refetch={refetch}
            closeModal={closeModal}
          />
        </ConfirmModal>
      )}
      {/* 페이지네이션 */}
      <div className={styles.pagination_box}>
        <PaginationComp
          page={page}
          setPage={setPage}
          totalItems={data.length}
          itemsPerPage={itemsPerPage}
          filterApplied={filter}
        />
      </div>
    </>
  );
};

export default DiyPriceList;
