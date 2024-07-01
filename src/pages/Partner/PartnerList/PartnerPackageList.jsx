import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import axios from 'axios';

import styles from '../../../components/List/List.module.css';
import useFetchData from '../../../hooks/useFetchDiyData';
import ListTable from '../../../components/List/ListTable';
import ListModal from '../../../components/List/Modal/ListModal';
import PaginationComp from '../../../components/Pagination/PaginationComp';

const PartnerPackageList = () => {
  const location = useLocation();

  // 초기상태와 변수
  const itemsPerPage = 10; // 필요에 따라 조정 가능
  const query = new URLSearchParams(location.search);
  const initialPage = parseInt(query.get('page')) || 1;
  const endpoint = '/api/partner/over-liked-packages';

  // 상태 관리
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  const [page, setPage] = useState(initialPage);
  const [price, setPrice] = useState('');
  const [necessaryPeople, setNecessaryPeople] = useState('');
  const [specialBenefits, setSpecialBenefits] = useState('');

  // 데이터 가져오는 커스텀 훅 사용
  const { data, loading, error, refetch } = useFetchData(endpoint);

  // 로딩 중이면 로딩 표시
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

  // 모달 열기
  const openModal = (item) => {
    setSelectedItem(item);
    setModalOpen(true);
  };

  // 모달 닫기
  const closeModal = () => {
    setSelectedItem(null);
    setPrice('');
    setNecessaryPeople('');
    setSpecialBenefits('');
    setModalOpen(false);
  };

  // 입력 값 변경 시 처리
  const handleInputChange = (setValue) => (e) => {
    setValue(e.target.value);
  };

  // 제출 처리
  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = {
      packageNum: selectedItem.diyPackage.packageNum,
      price,
      necessaryPeople,
      specialBenefits,
    };

    try {
      const token = localStorage.getItem('token');
      const response = await axios.post(
        `/api/partner/over-liked-packages/offer`,
        formData,
        {
          headers: {
            Accept: 'application/json',
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.status === 201) {
        closeModal();
        refetch();
      }
    } catch (err) {
      console.error('제안 등록 중 오류:', err);
    }
  };

  // 현재 페이지에 해당하는 데이터 계산
  const startIndex = (page - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentItems = data.slice(startIndex, endIndex);

  // 화면 렌더링
  return (
    <div className={styles.box}>
      <h2 style={{ margin: '1.5rem 0' }}>Diy 목록</h2>
      <ListTable>
        <thead>
          <tr>
            <th>패키지 번호</th>
            <th>이름</th>
            <th>작성자</th>
            <th>좋아요 수</th>
            <th>가격 등록</th>
          </tr>
        </thead>
        <tbody>
          {currentItems.map((item) => (
            <tr key={item.overLikedListNum}>
              <td>{item.diyPackage.packageNum}</td>
              <td>
                <Link to={`/diy/${item.diyPackage.packageNum}`}>
                  {item.diyPackage.packageName}
                </Link>
              </td>
              <td>{item.diyPackage.user.userNickname}</td>
              <td>{item.diyPackage.packageLikedNum}</td>
              <td>
                <button onClick={() => openModal(item)}>등록</button>
              </td>
            </tr>
          ))}
        </tbody>
      </ListTable>
      <ListModal
        isVisible={modalOpen}
        closeModal={closeModal}
        title="가격 등록"
      >
        {selectedItem && (
          <div className={styles.modal_form}>
            <p>{selectedItem.diyPackage.packageName}</p>
            <form onSubmit={handleSubmit}>
              <label>제안 가격:</label>
              <input
                type="text"
                name="price"
                value={price}
                onChange={handleInputChange(setPrice)}
                required
              />
              <br />
              <label>모집 인원:</label>
              <input
                type="text"
                name="necessaryPeople"
                value={necessaryPeople}
                onChange={handleInputChange(setNecessaryPeople)}
                required
              />
              <br />
              <label>특별 혜택:</label>
              <input
                type="text"
                name="specialBenefits"
                value={specialBenefits}
                onChange={handleInputChange(setSpecialBenefits)}
                required
              />
              <br />
              <div className={styles.button_box}>
                <button type="submit">등록하기</button>
              </div>
            </form>
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
        />
      </div>
    </div>
  );
};

export default PartnerPackageList;
