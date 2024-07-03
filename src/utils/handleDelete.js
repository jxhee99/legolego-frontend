import apiClient from '../api/apiClient';
import ConfirmModal from '../components/List/Modal/ConfirmModal';
import { useState } from 'react';


export const deleteList = async (e, endpoint, refetch, closeModal) => {
  e.preventDefault();
  try {
    const token = localStorage.getItem('token');
    const response = await apiClient.delete(endpoint);

    if (response.status === 204) {
      closeModal();
      refetch();
    } else {
      console.error('삭제 실패:', response.status);
    }
    closeModal();
  } catch (err) {
    console.error('삭제 중 오류:', err);
  }
};

export const deleteDetail = async (endpoint, navigate) => {

  try {
    const response = await apiClient.delete(endpoint);
    if (response.status === 204) {
      navigate();
    }
  } catch (err) {
    console.error('삭제 중 오류', err);
  }
}



export const DeleteConfirmModal = () => {
  const [modalOpen, setModalOpen] = useState(true);

  // 모달 닫기 함수
  const closeModal = () => {
    setModalOpen(false);
  };
  return (
    <div>
      <ConfirmModal isVisible={modalOpen} onClose={closeModal}>
        <p>정말 삭제하시겠습니까?</p>
        <div>
          <button onClick={deleteDetail}>삭제</button>
          <button onClick={closeModal}>취소</button>
        </div>
      </ConfirmModal>
    </div>
  );
};

