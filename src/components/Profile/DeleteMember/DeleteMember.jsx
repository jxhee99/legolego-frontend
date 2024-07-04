import { useState, useContext } from 'react';
import apiClient from '../../../api/apiClient';
import ConfirmModal from '../../List/Modal/ConfirmModal';
import styles from './DeleteMember.module.css';
import { AuthContext } from '../../../contexts/AuthContext';

const DeleteMember = ({ endpoint }) => {
  const { logout } = useContext(AuthContext);

  const [modalOpen, setModalOpen] = useState(false);
  // 모달 열기 함수
  const openModal = (item) => {
    setModalOpen(true);
  };

  // 모달 닫기 함수
  const closeModal = () => {
    setModalOpen(false);
  };
  const handleDelete = async () => {
    try {
      const response = await apiClient.patch(endpoint);
      if (response.status === 200) {
        window.alert('탈퇴 성공! 안녕히가세요~');
        logout();
      }
    } catch (error) {
      console.error('회원 탈퇴 중 오류 발생:', error);
      alert('회원 탈퇴 중 오류가 발생했습니다. 다시 시도해주세요.');
    }
  };

  return (
    <>
      <button onClick={openModal}>회원 탈퇴</button>
      <ConfirmModal
        isVisible={modalOpen}
        closeModal={closeModal}
        title={'주의'}
      >
        <div className={styles.confirm_modal_inner}>
          <p>정말 탈퇴하시겠습니까?</p>
          <div>
            <button onClick={handleDelete}>탈퇴</button>
            <button onClick={closeModal}>취소</button>
          </div>
        </div>
      </ConfirmModal>
    </>
  );
};

export default DeleteMember;
