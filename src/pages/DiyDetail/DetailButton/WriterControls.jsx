// WriterControls.jsx
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import styles from '../DiyDetail.module.css';
import ConfirmModal from '../../../components/List/Modal/ConfirmModal';
import apiClient from '../../../api/apiClient';

const deleteDetail = async (endpoint, navigate) => {
  try {
    const response = await apiClient.delete(endpoint);
    if (response.status === 204) {
      navigate();
    }
  } catch (err) {
    console.error('삭제 중 오류', err);
    if (err.response && err.response.data) {
      window.alert(err.response.data || '삭제 중 오류가 발생했습니다.');
    } else {
      window.alert('삭제 중 오류가 발생했습니다.');
    }
  }
};

const WriterControls = ({ id }) => {
  const navigate = useNavigate();
  const [modalOpen, setModalOpen] = useState(false);
  // 모달 열기 함수
  const openModal = (item) => {
    setModalOpen(true);
  };

  // 모달 닫기 함수
  const closeModal = () => {
    setModalOpen(false);
  };

  const handleDelete = () => {
    deleteDetail(`/user/packages/${id}`, () => navigate('/diy'));
  };

  return (
    <>
      <div className={styles.writer_button}>
        <button>
          <Link to={`/diy-edit/${id}`}>수정</Link>
        </button>
        <button onClick={openModal}>삭제</button>
      </div>
      <ConfirmModal
        isVisible={modalOpen}
        closeModal={closeModal}
        title={'주의'}
      >
        <div className={styles.confirm_modal_inner}>
          <p>정말 삭제하시겠습니까?</p>
          <div>
            <button onClick={handleDelete}>삭제</button>
            <button onClick={closeModal}>취소</button>
          </div>
        </div>
      </ConfirmModal>
    </>
  );
};

export default WriterControls;
