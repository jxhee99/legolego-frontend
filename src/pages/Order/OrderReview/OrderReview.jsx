import { useEffect, useState } from 'react';
import styles from './OrderReview.module.css';
import Box from '@mui/material/Box';
import Rating from '@mui/material/Rating';
import Modal from '@mui/material/Modal';
import apiClient from '../../../api/apiClient';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

const OrderReview = ({ open, handleClose, orderNum, reviewNum }) => {
  const [reviewText, setReviewText] = useState('');
  const [value, setValue] = useState(0);

  useEffect(() => {
    const fetchReview = async () => {
      try {
        if (reviewNum) {
          const response = await apiClient.get(
            `/user/reviews/${reviewNum}/orders/${orderNum}`
          );
          setReviewText(response.data.content);
          setValue(response.data.rating);
        }
      } catch (error) {
        console.error('리뷰를 불러오는 중 오류가 발생했습니다:', error);
      }
    };
    fetchReview();
  }, [reviewNum, orderNum]);

  const handleSave = async () => {
    if (reviewText.trim() === '') {
      alert('리뷰 내용을 입력하세요');
      return;
    }
    try {
      const response = await apiClient.post(`/user/reviews/${orderNum}`, {
        content: reviewText,
        rating: value,
      });
      console.log('Review saved:', response.data);
      handleClose();
    } catch (error) {
      console.error('리뷰 저장 중 오류가 발생했습니다:', error);
    }
  };

  const handleEdit = async () => {
    if (reviewText.trim() === '') {
      alert('리뷰 내용을 입력하세요');
      return;
    }
    try {
      const response = await apiClient.patch(
        `/user/reviews/${reviewNum}/edit`,
        {
          content: reviewText,
          rating: value,
        }
      );
      console.log('Review edited:', response.data);
      handleClose();
    } catch (error) {
      console.error('리뷰 수정 중 오류가 발생했습니다:', error);
    }
  };

  const handleDelete = async () => {
    if (!window.confirm('리뷰를 삭제하시겠습니까?')) {
      return;
    }
    try {
      await apiClient.delete(`/user/reviews/${reviewNum}/delete`);
      console.log('Review deleted');
      handleClose();
    } catch (error) {
      console.error('리뷰 삭제 중 오류가 발생했습니다:', error);
    }
  };

  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={style}>
        <h2 id="modal-modal-title" className={styles.modalTitle}>
          리뷰 작성
        </h2>
        <Rating
          name="simple-controlled"
          value={value}
          onChange={(event, newValue) => {
            setValue(newValue);
          }}
        />
        <textarea
          placeholder="리뷰 내용을 입력하세요"
          className={styles.textarea}
          value={reviewText}
          onChange={(e) => setReviewText(e.target.value)}
        />
        <div className={styles.buttonGroup}>
          <button
            onClick={handleClose}
            className={`${styles.button} ${styles.buttonClose}`}
          >
            닫기
          </button>
          {reviewNum ? (
            <>
              <button
                onClick={handleEdit}
                className={`${styles.button} ${styles.buttonSave}`}
              >
                저장
              </button>
              <button
                onClick={handleDelete}
                className={`${styles.button} ${styles.buttonDelete}`}
              >
                삭제
              </button>
            </>
          ) : (
            <button
              onClick={handleSave}
              className={`${styles.button} ${styles.buttonSave}`}
            >
              저장
            </button>
          )}
        </div>
      </Box>
    </Modal>
  );
};

export default OrderReview;
