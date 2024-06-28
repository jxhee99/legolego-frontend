import React from 'react';
import { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';
import styles from '../../../components/List/List.module.css';

import ListTable from '../../../components/List/ListTable';
import ListModal from '../../../components/List/Modal/ListModal';

import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';

//api함수, util 함수
import useFetchData from '../../../hooks/useFetchDiyData';
import { combineDateTime } from '../../../utils/DateTime';

const AdminListDiyPrice = () => {
  const location = useLocation();
  const navigate = useNavigate();
  // 초기 상태와 변수 설정
  const query = new URLSearchParams(location.search);
  const initialPage = parseInt(query.get('page')) || 1;
  const initialFilter = query.get('filter') === 'true';
  const itemsPerPage = 10;

  //상태관리
  const [modalOpen, setModalOpen] = useState(false); // 모달 상태 추가
  const [modalType, setModalType] = useState(null); // 모달 타입 상태 추가
  const [filterApplied, setFilterApplied] = useState(initialFilter);
  const [page, setPage] = useState(initialPage);
  const [selectedItem, setSelectedItem] = useState(null);
  const [deadlineDate, setDeadlineDate] = useState(null);
  const [deadlineTime, setDeadlineTime] = useState(null);

  //get요청
  const endpoint = '/api/admin/diylists';
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
    return <div>Loading...</div>;
  }
  // 필터된 데이터 설정
  const filteredData = filterApplied
    ? data.filter(
        (item) => item.isSelected === true && item.isRegistered === false
      )
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
    setDeadlineDate(null);
    setDeadlineTime(null);
    setModalOpen(false); // 모달 닫기
  };

  const handleInputChange = (setValue) => (e) => {
    const value = e.target.value;
    setValue(value);
    console.log(value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const combinedDateTime = combineDateTime(deadlineDate, deadlineTime);
      if (!combinedDateTime) {
        console.error('날짜와 시간을 선택해주세요');
        return;
      }
      const token = localStorage.getItem('token');
      const response = await axios.post(
        `/api/admin/register?list_num=${selectedItem.listNum}&recruitment_dead_line=${combinedDateTime}`,
        {},
        {
          headers: {
            Accept: 'application/json',
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.status === 200) {
        // 요청이 성공한 경우
        console.log('승인');
        refetch(); // 데이터 다시 가져오기
      } else {
        console.error('승인 실패:', response.status);
      }
      closeModal();
    } catch (err) {
      console.error('상품 등록 중 오류:', err);
    }
  };

  return (
    <div className={styles.box}>
      <h2>응원 달성 Diy 목록</h2>
      {/* 필터 버튼 */}
      <button onClick={toggleFilter} className={styles.filter_button}>
        {filterApplied ? '전체 보기' : '등록'}
      </button>

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
          <div className={styles.modal_form}>
            <p>{selectedItem.diyPackage.packageName}</p>
            <br></br>
            <form onSubmit={handleSubmit}>
              <div>모집 마감기한</div>
              <label>날짜</label>
              <input
                type="date"
                value={deadlineDate}
                onChange={handleInputChange(setDeadlineDate)}
              />
              <br />
              <label>시간</label>
              <input
                type="time"
                value={deadlineTime}
                onChange={handleInputChange(setDeadlineTime)}
              />
              <div className={styles.button_box}>
                <button type="submit">등록</button>
              </div>
            </form>
          </div>
        )}
        {selectedItem && modalType === '제안 상세' && (
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

export default AdminListDiyPrice;
