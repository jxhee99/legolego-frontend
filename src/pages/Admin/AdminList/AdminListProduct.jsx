import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';

import ListTable from '../../../components/List/ListTable';
import ConfirmModal from '../../../components/List/Modal/ConfirmModal';
import useFetchData from '../../../hooks/useFetchDiyData';
import { formatDateTime } from '../../../utils/DateTime'; // formatDateTime import 수정

import styles from '../../../components/List/List.module.css';

const AdminListProduct = () => {
  const location = useLocation();
  const navigate = useNavigate();

  // 초기 상태와 변수 설정
  const query = new URLSearchParams(location.search);
  const initialPage = parseInt(query.get('page')) || 1;
  const initialFilter = query.get('filter') === 'true';
  const itemsPerPage = 10;
  const endpoint = '/api/products';

  // 상태 관리
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  const [filterApplied, setFilterApplied] = useState(initialFilter);
  const [page, setPage] = useState(initialPage);

  // 데이터 가져오기 훅
  const { data, loading, refetch } = useFetchData(endpoint);

  // 페이지 및 필터 변경 시 처리
  useEffect(() => {
    const newQuery = new URLSearchParams(location.search);
    newQuery.set('page', page);
    newQuery.set('filter', filterApplied);
    navigate({ search: newQuery.toString() }, { replace: true });
  }, [page, filterApplied, navigate, location.search]);

  // 로딩 중일 때
  if (loading) {
    return <div>로딩 중...</div>;
  }

  // 필터된 데이터 설정
  const filteredData = filterApplied
    ? data.filter((item) => item.recruitmentConfirmed === true)
    : data;

  // 현재 페이지에 맞는 데이터 계산
  const startIndex = (page - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentItems = filteredData.slice(startIndex, endIndex);

  // 필터 토글 함수
  const toggleFilter = () => {
    setFilterApplied(!filterApplied);
    setPage(1);
  };

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
      <button onClick={toggleFilter} className={styles.filter_button}>
        {filterApplied ? '전체 보기' : '모집 확정'}
      </button>

      {/* 목록 테이블 */}
      <ListTable>
        <thead>
          <tr>
            <th>상품 번호</th>
            <th>Name</th>
            <th>작성자</th>
            <th>마감일</th>
            <th>모집확정</th>
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
        <Stack spacing={2} className={styles.pagination}>
          <Pagination
            count={Math.ceil(filteredData.length / itemsPerPage)}
            page={page}
            onChange={(_, value) => setPage(value)}
          />
        </Stack>
      </div>
    </div>
  );
};

export default AdminListProduct;
