import React from 'react';
import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import useFetchData from '../../../hooks/useFetchDiyData';
import ListTable from '../../../components/List/ListTable';
import ListModal from '../../../components/List/Modal/ListModal';

import styles from '../../../components/List/List.module.css';
import PaginationComp from '../../../components/Pagination/PaginationComp';
import ToggleFilter from '../../../components/ToggleFilter/ToggleFilter';

const PartnerPriceList = () => {
  const location = useLocation();

  // 초기 상태와 변수 설정
  const query = new URLSearchParams(location.search);
  const initialPage = parseInt(query.get('page')) || 1;
  const initialFilter = query.get('filter') || '';
  const itemsPerPage = 10;

  //상태관리
  const [modalOpen, setModalOpen] = useState(false); // 모달 상태 추가
  const [selectedItem, setSelectedItem] = useState(null);
  const [filter, setFilter] = useState(initialFilter);
  const [page, setPage] = useState(initialPage);

  //get요청
  const endpoint = '/api/partner/diylists';
  const { data, loading, error } = useFetchData(endpoint);

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
  const filteredData =
    filter === 'selected'
      ? data.filter((item) => item.isSelected === true)
      : data;

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
  const toggleButtons = [{ value: 'selected', label: '채택' }];

  // 모달 열기
  const openModal = (item) => {
    setSelectedItem(item); // 선택된 아이템 설정
    setModalOpen(true); // 모달 열기
  };

  // 모달 닫기
  const closeModal = () => {
    setSelectedItem(null); // 선택된 아이템 초기화
    setModalOpen(false); // 모달 닫기
  };

  return (
    <div className={styles.box}>
      <h2>가격 제안 목록</h2>
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
              <td>{item.price}</td>
              <td onClick={() => openModal(item)}>
                <button>보기</button>
              </td>
              <td>
                {item.isSelected === null && <span>대기중</span>}
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
                {item.isSelected === false && <span></span>}
              </td>
            </tr>
          ))}
        </tbody>
      </ListTable>
      <ListModal
        isVisible={modalOpen}
        closeModal={closeModal}
        title="제안 상세"
      >
        {selectedItem && (
          <div className={styles.modal_text_box}>
            <div className={styles.detail}>
              <span>패키지:</span>
              <p>{selectedItem.diyPackage.packageName}</p>
            </div>
            <div className={styles.detail}>
              <span>가격:</span>
              <p>{selectedItem.price}</p>
            </div>
            <div className={styles.detail}>
              <span>모집인원:</span>
              <p>{selectedItem.necessaryPeople}</p>
            </div>
            <div className={styles.detail}>
              <span>스페셜혜택:</span>
              <p>{selectedItem.specialBenefits}</p>
            </div>
          </div>
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

export default PartnerPriceList;
