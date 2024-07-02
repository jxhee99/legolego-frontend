import { useState } from 'react';
import styles from './OrderReview.module.css';
import Box from '@mui/material/Box';
import Rating from '@mui/material/Rating';
import Modal from '@mui/material/Modal';
import axios from 'axios';

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

const OrderReview = ({ open, handleClose, orderNum }) => {
  const [reviewText, setReviewText] = useState('');
  const [value, setValue] = useState(0);
  const token = localStorage.getItem('token');

  const handleSave = async () => {
    if (reviewText.trim() === '') {
      alert('리뷰 내용을 입력하세요');
      return;
    }
    try {
      const response = await axios.post(
        `/api/user/reviews/${orderNum}`,
        {
          content: reviewText,
          rating: value,
        },
        {
          headers: {
            Accept: 'application/json',
            Authorization: `Bearer ${token}`,
          },
        }
      );

      console.log('Review saved:', reviewText);
    } catch (error) {
      console.log(error);
    }

    handleClose();
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
        {/* <p id="modal-modal-description" className={styles.modalDescription}>
          주문번호: {orderNum}
        </p> */}
        <Rating
          name="simple-controlled"
          sx={{
            '& > legend': { mt: 2 },
          }}
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
          <button className={`${styles.button} ${styles.buttonEdit}`}>
            수정
          </button>
          <button
            onClick={handleSave}
            className={`${styles.button} ${styles.buttonSave}`}
          >
            저장
          </button>
        </div>
      </Box>
    </Modal>
  );
};

export default OrderReview;
