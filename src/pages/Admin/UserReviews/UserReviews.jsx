import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';

import ListTable from '../../../components/List/ListTable';
import ConfirmModal from '../../../components/List/Modal/ConfirmModal';
import PaginationComp from '../../../components/Pagination/PaginationComp';
import ToggleFilter from '../../../components/ToggleFilter/ToggleFilter';
import useFetchData from '../../../hooks/useFetchDiyData';
import { formatDateTime, getCurrentTime } from '../../../utils/DateTime';
import { deleteList } from '../../../utils/handleDelete';

import styles from '../../../components/List/List.module.css';

const UserReviews = () => {
  const location = useLocation();

  // 초기 상태와 변수 설정
  const query = new URLSearchParams(location.search);
  const initialPage = parseInt(query.get('page')) || 1;
  const initialFilter = query.get('filter') || '';
  const itemsPerPage = 10;
  const endpoint = '/admin/reviews';

  // 상태 관리
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  const [filter, setFilter] = useState(initialFilter);
  const [page, setPage] = useState(initialPage);

  // 데이터 가져오기 훅
  const { data, loading, error, refetch } = useFetchData(endpoint);
  console.log(data);

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
  if (filter === 'ing') {
    data.filter((item) => new Date(item.comingDate) > getCurrentTime());
  }

  // 현재 페이지에 맞는 데이터 계산
  const startIndex = (page - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentItems = filteredData.slice(startIndex, endIndex);

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
      <h2>회원 리뷰 목록</h2>
      <ListTable>
        <thead>
          <tr>
            <th>리뷰 번호</th>
            <th>후기</th>
            <th>작성자</th>
            <th>작성날짜</th>
            <th>게시판 번호</th>
            <th>삭제</th>
          </tr>
        </thead>
        <tbody>
          {currentItems.map((item) => (
            <tr key={item.reviewNum}>
              <td>{item.reviewNum}</td>
              <td>{item.content}</td>
              <td style={{ width: '15%' }}>{item.userNickname}</td>
              <td style={{ width: '15%' }}>
                {formatDateTime(item.createDate)}
              </td>
              <td>{item.boardNum}</td>
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
                    `/api/admin/pre-trip/${selectedItem.boardNum}/delete`,
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
        {/* 페이지네이션 컴포넌트 */}
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

export default UserReviews;
