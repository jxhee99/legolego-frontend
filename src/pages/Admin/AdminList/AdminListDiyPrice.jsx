import React from 'react';
import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import styles from '../../../components/List/List.module.css';

import ListTable from '../../../components/List/ListTable';
import ListModal from '../../../components/List/Modal/ListModal';
import PriceDetail from '../../../components/List/PriceDetail/PriceDetail';
import ProductRegisterModal from '../../../components/List/ProductRegister/ProductRegisterModal';
import ToggleFilter from '../../../components/ToggleFilter/ToggleFilter';
import PaginationComp from '../../../components/Pagination/PaginationComp';

//api함수, util 함수
import useFetchData from '../../../hooks/useFetchDiyData';

const AdminListDiyPrice = () => {
  const location = useLocation();

  // 초기 상태와 변수 설정
  const query = new URLSearchParams(location.search);
  const initialPage = parseInt(query.get('page')) || 1;
  const initialFilter = query.get('filter') || '';
  const itemsPerPage = 10;

  //상태관리
  const [modalOpen, setModalOpen] = useState(false); // 모달 상태 추가
  const [modalType, setModalType] = useState(null); // 모달 타입 상태 추가
  const [filter, setFilter] = useState(initialFilter);
  const [page, setPage] = useState(initialPage);
  const [selectedItem, setSelectedItem] = useState(null);

  //get요청
  const endpoint = '/api/admin/diylists';
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
  if (filter === 'register') {
    filteredData = data.filter(
      (item) => item.isSelected === true && item.isRegistered === false
    );
  }

  // 현재 페이지에 맞는 데이터 계산
  const startIndex = (page - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentItems = filteredData.slice(startIndex, endIndex);

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
  //필터 토글 버튼
  const toggleButtons = [{ value: 'register', label: '등록' }];

  // 모달 열기
  const openModal = (item, type) => {
    setSelectedItem(item); // 선택된 아이템 설정
    setModalType(type); //타입설정
    setModalOpen(true); // 모달 열기
  };

  // 모달 닫기
  const closeModal = () => {
    setSelectedItem(null); // 선택된 아이템 초기화
    setModalType(null);
    setModalOpen(false); // 모달 닫기
  };

  return (
    <div className={styles.box}>
      <h2>응원 달성 Diy 목록</h2>
      {/* 필터 버튼 */}
      <div className={styles.filter_box}>
        <ToggleFilter
          filter={filter}
          handleChange={handleChange}
          setFilter={setFilter}
          buttons={toggleButtons}
        />
      </div>

      <ListTable>
        <thead>
          <tr>
            <th>패키지 번호</th>
            <th>Name</th>
            <th>작성자</th>
            <th>partner</th>
            <th>가격</th>
            <th>상세</th>
            <th>채택여부</th>
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
              <td>{item.diyPackage.user.userNickname}</td>
              <td>{item.partner.companyName}</td>
              <td>{item.price}</td>
              <td onClick={() => openModal(item, '제안 상세')}>
                <button>보기</button>
              </td>
              <td>
                {item.isSelected === null && <span>대기중</span>}
                {item.isSelected === true && <span>수락</span>}
                {item.isSelected === false && <span>거절</span>}
              </td>
              <td>
                {item.isSelected === true && item.isRegistered === false && (
                  <button onClick={() => openModal(item, '상품 등록')}>
                    등록
                  </button>
                )}
                {item.isRegistered === true && (
                  <Link to={`/package-product/${item.productNum}`}>완료</Link>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </ListTable>
      <ListModal
        isVisible={modalOpen}
        closeModal={closeModal}
        title={modalType}
      >
        {selectedItem && modalType === '상품 등록' && (
          <ProductRegisterModal
            selectedItem={selectedItem}
            closeModal={closeModal}
            refetch={refetch}
          />
        )}
        {selectedItem && modalType === '제안 상세' && (
          <PriceDetail selectedItem={selectedItem} />
        )}
      </ListModal>
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
    </div>
  );
};

export default AdminListDiyPrice;
