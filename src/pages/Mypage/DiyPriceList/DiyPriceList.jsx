import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import styles from '../../../components/List/List.module.css';
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import ListTable from '../../../components/List/ListTable';
import ListModal from '../../../components/List/Modal/ListModal';
import useFetchData from '../../../hooks/useFetchDiyData';

const DiyPriceList = () => {
  const location = useLocation();
  const navigate = useNavigate();

  // 초기 상태와 변수 설정
  const query = new URLSearchParams(location.search);
  const initialPage = parseInt(query.get('page')) || 1;
  const initialFilter = query.get('filter') || null; // 초기값 'null'로 설정
  const itemsPerPage = 10;

  // 상태관리
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  const [filter, setFilter] = useState(initialFilter); // filter 상태 추가
  const [page, setPage] = useState(initialPage);

  // get 요청
  const endpoint = '/api/diylists/user/1';
  const { data, loading, refetch } = useFetchData(endpoint);

  // 페이지 및 필터 변경 시 처리
  useEffect(() => {
    const newQuery = new URLSearchParams(location.search);
    newQuery.set('page', page);
    newQuery.set('filter', filter);
    navigate({ search: newQuery.toString() });
  }, [page, filter, navigate, location.search]);

  // 로딩 중일 때
  if (loading) {
    return <div>Loading...</div>;
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
  const openModal = (item) => {
    setSelectedItem(item);
    setModalOpen(true);
  };

  // 모달 닫기
  const closeModal = () => {
    setSelectedItem(null);
    setModalOpen(false);
  };

  // 필터 설정
  const handleChange = (event, newFilter) => {
    setFilter(newFilter);
    setPage(1);
  };

  // 승인 요청
  const handleApprove = async (item) => {
    try {
      const response = await axios.post(
        `/api/diylists/user/1/accept?list_num=${item.listNum}&package_num=${item.diyPackage.packageNum}`
      );

      if (response.status === 200) {
        console.log('승인');
        refetch();
      } else {
        console.error('승인 실패:', response.status);
      }
    } catch (error) {
      console.error('에러 발생:', error);
    }
  };

  return (
    <>
      <ToggleButtonGroup
        color="primary"
        value={filter}
        exclusive
        onChange={handleChange}
        aria-label="Platform"
      >
        <ToggleButton
          value="suggest"
          sx={{
            borderRadius: '12px',
            height: 32,
          }}
        >
          제안
        </ToggleButton>
        <ToggleButton
          value="product"
          sx={{
            borderRadius: '12px',
            height: 32,
          }}
        >
          상품
        </ToggleButton>
      </ToggleButtonGroup>

      <ListTable>
        <thead>
          <tr>
            <th>패키지 번호</th>
            <th>Name</th>
            <th>partner</th>
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
              <td onClick={() => openModal(item)}>
                <button>보기</button>
              </td>
              <td>
                {item.isSelected === null && (
                  <span onClick={() => handleApprove(item)}>
                    <button>받기</button>
                  </span>
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
        <Stack spacing={2} className={styles.pagination}>
          <Pagination
            count={Math.ceil(filteredData.length / itemsPerPage)}
            page={page}
            onChange={(_, value) => setPage(value)}
          />
        </Stack>
      </div>
    </>
  );
};

export default DiyPriceList;
