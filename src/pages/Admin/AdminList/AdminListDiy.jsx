import React from 'react';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import styles from '../../../components/List/List.module.css';

import ListTable from '../../../components/List/ListTable';
import ConfirmModal from '../../../components/List/Modal/ConfirmModal';

//api함수, util 함수
import useFetchData from '../../../hooks/useFetchListData';

const AdminListDiy = () => {
  const [modalOpen, setModalOpen] = useState(false); // 모달 상태 추가
  const [selectedItem, setSelectedItem] = useState(null);

  //get요청
  const endpoint = '/api/packages';
  const { data, loading, refetch } = useFetchData(endpoint);

  if (loading) {
    return <div>Loading...</div>;
  }

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

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(selectedItem.packageNum);
    try {
      const response = await axios.delete(
        `/api/admin/packages/${selectedItem.packageNum}`
      );

      if (response.status === 204) {
        // 요청이 성공한 경우
        console.log('삭제');
        refetch(); // 데이터 다시 가져오기
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
      <h2>Diy 목록</h2>
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
          {data.map((item) => (
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
    </div>
  );
};

export default AdminListDiy;
