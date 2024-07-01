import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';

import PaginationComp from '../../../components/Pagination/PaginationComp';
import ToggleFilter from '../../../components/ToggleFilter/ToggleFilter';
import ListTable from '../../../components/List/ListTable';
import ConfirmModal from '../../../components/List/Modal/ConfirmModal';

import useFetchData from '../../../hooks/useFetchDiyData';
import { deleteList } from '../../../utils/handleDelete';

import styles from '../../../components/List/List.module.css';

const AdminListDiy = () => {
  const location = useLocation();

  // 초기 상태와 변수 설정
  const query = new URLSearchParams(location.search);
  const initialPage = parseInt(query.get('page')) || 1;
  const initialFilter = query.get('filter') || '';
  const itemsPerPage = 10;
  const endpoint = '/api/packages';

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
  const filteredData =
    filter === 'overLiked'
      ? data.filter((item) => item.packageLikedNum >= 2)
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
  const toggleButtons = [{ value: 'overLiked', label: '응원달성' }];

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

  return (
    <div className={styles.box}>
      <h2>Diy 목록</h2>

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
            <th>패키지 번호</th>
            <th>Name</th>
            <th>작성자</th>
            <th>응원수</th>
            <th>조회수</th>
            <th>삭제</th>
          </tr>
        </thead>
        <tbody>
          {currentItems.map((item) => (
            <tr key={item.packageNum}>
              <td>{item.packageNum}</td>
              <td>
                <Link to={`/diy/${item.packageNum}`}>{item.packageName}</Link>
              </td>
              <td>{item.user.userNickname}</td>
              <td>{item.packageLikedNum}</td>
              <td>{item.packageViewNum}</td>
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
              <button
                onClick={(e) =>
                  deleteList(
                    e,
                    `/api/admin/packages/${selectedItem.packageNum}`,
                    refetch,
                    closeModal
                  )
                }
              >
                삭제
              </button>
              <button onClick={closeModal}>취소</button>
            </div>
          </div>
        )}
      </ConfirmModal>
      <div className={styles.pagination_box}>
        {/* 페이지네이션 */}
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

export default AdminListDiy;
