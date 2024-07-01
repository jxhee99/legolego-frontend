import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import axios from 'axios';

import PaginationComp from '../../../components/Pagination/PaginationComp';
import ToggleFilter from '../../../components/ToggleFilter/ToggleFilter';
import ListTable from '../../../components/List/ListTable';
import ConfirmModal from '../../../components/List/Modal/ConfirmModal';

import useFetchData from '../../../hooks/useFetchDiyData';
import { formatDateTime } from '../../../utils/DateTime'; // formatDateTime import 수정

import styles from '../../../components/List/List.module.css';

const AdminListProduct = () => {
  const location = useLocation();

  // 초기 상태와 변수 설정
  const query = new URLSearchParams(location.search);
  const initialPage = parseInt(query.get('page')) || 1;
  const initialFilter = query.get('filter') || '';
  const itemsPerPage = 10;
  const endpoint = '/api/products';

  // 상태 관리
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  const [filter, setFilter] = useState(initialFilter);
  const [page, setPage] = useState(initialPage);

  // 데이터 가져오기 훅
  const { data, loading, error, refetch } = useFetchData(endpoint);

  // 로딩 중일 때
  if (loading) {
    return <div>로딩 중...</div>;
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
  if (filter === 'confirm') {
    filteredData = data.filter((item) => item.recruitmentConfirmed === true);
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
  const toggleButtons = [{ value: 'confirm', label: '여행 확정' }];

  // 모달 열기 함수
  const openModal = (item) => {
    setSelectedItem(item);
    setModalOpen(true);
  };

  // 모달 닫기 함수
  const closeModal = () => {
    setSelectedItem(null);
    setModalOpen(false);
  };

  // 삭제 처리 함수
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.delete(`/`);

      if (response.status === 204) {
        refetch();
      } else {
        console.error('삭제 실패:', response.status);
      }
      closeModal();
    } catch (err) {
      console.error('삭제 중 오류:', err);
    }
  };

  return (
    <div className={styles.box}>
      <h2>상품 목록</h2>

      {/* 필터 버튼 */}
      <div className={styles.filter_box}>
        <ToggleFilter
          filter={filter}
          handleChange={handleChange}
          setFilter={setFilter}
          buttons={toggleButtons}
        />
      </div>

      {/* 목록 테이블 */}
      <ListTable>
        <thead>
          <tr>
            <th>상품 번호</th>
            <th>Name</th>
            <th>작성자</th>
            <th>마감일</th>
            <th>여행확정</th>
            <th>삭제</th>
          </tr>
        </thead>
        <tbody>
          {currentItems.map((item) => (
            <tr key={item.productNum}>
              <td>{item.productNum}</td>
              <td>
                <Link to={`/package-product/${item.productNum}`}>
                  {item.productName}
                </Link>
              </td>
              <td>{item.userNickname}</td>
              <td style={{ width: '15%' }}>
                {formatDateTime(item.recruitmentDeadline)}
              </td>
              {/* formatDateTime 함수 호출 수정 */}
              <td>
                {item.recruitmentConfirmed ? (
                  <span>확정</span>
                ) : (
                  <span>모집중</span>
                )}
              </td>
              <td>
                <button onClick={() => openModal(item)}>삭제</button>
              </td>
            </tr>
          ))}
        </tbody>
      </ListTable>

      {/* 확인 모달 */}
      <ConfirmModal
        isVisible={modalOpen}
        closeModal={closeModal}
        title={'주의'}
      >
        {selectedItem && (
          <div className={styles.confirm_modal_inner}>
            <p>정말 삭제하시겠습니까?</p>
            <div>
              <button onClick={handleSubmit}>삭제</button>
              <button onClick={closeModal}>취소</button>
            </div>
          </div>
        )}
      </ConfirmModal>
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

export default AdminListProduct;
