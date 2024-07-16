// WriterControls.jsx
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import styles from '../DiyDetail.module.css';
import ConfirmModal from '../../../components/List/Modal/ConfirmModal';
import apiClient from '../../../api/apiClient';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';

const deleteDetail = async (endpoint, navigate, isEditDeletePossible) => {
  if (!isEditDeletePossible) {
    window.alert('응원 달성 & 상품 등록된 패키지는 삭제할 수 없습니다.');
    return;
  }
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

const WriterControls = ({ id, isEditDeletePossible, likedNum }) => {
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

  //수정 가능한지 검사
  const handleEdit = () => {
    if (likedNum >= 2) {
      window.alert('응원 달성한 패키지는 수정할 수 없습니다.');
      return;
    }
    navigate(`/diy-edit/${id}`);
  };

  const handleDelete = () => {
    deleteDetail(
      `/user/packages/${id}`,
      () => navigate('/diy'),
      isEditDeletePossible
    );
  };

  return (
    <>
      <div className={styles.writer_button}>
        {/* <button onClick={handleEdit}>수정</button> */}
        {/* <button onClick={openModal}>삭제</button> */}
        <EditIcon
          onClick={handleEdit}
          className={styles.edit_delete_button}
          fontSize="small"
        />
        <DeleteIcon
          onClick={openModal}
          className={styles.edit_delete_button}
          fontSize="small"
        />
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
