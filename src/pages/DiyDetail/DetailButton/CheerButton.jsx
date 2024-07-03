import apiClient from '../../../api/apiClient';
import styles from '../DiyDetail.module.css';

const CheerButton = ({ id, likedNum, isLiked, setLikedNum, setIsLiked }) => {
  const handleLike = async () => {
    const userRole = localStorage.getItem('role');
    if (userRole !== 'USER') {
      window.alert('로그인한 유저만 가능합니다.');
      return;
    }
    try {
      const response = await apiClient.post(`/user/packages/likes/${id}`);
      if (response.status === 200) {
        // 요청이 성공한 경우
        console.log('성공');
        setLikedNum(likedNum + 1);
        setIsLiked(true); // 응원 완료 상태로 설정
      } else {
        console.error('승인 실패:', response.status);
      }
    } catch (err) {
      if (err.response && err.response.data) {
        window.alert(
          err.response.data.message || '요청 중 오류가 발생했습니다.'
        );
      } else {
        window.alert('요청 중 오류가 발생했습니다.');
      }
    }
  };

  return isLiked ? (
    <button className={styles.cheer_button} style={{ cursor: 'default' }}>
      응원 완료!
    </button>
  ) : (
    <button className={styles.cheer_button} onClick={handleLike}>
      응원하기
    </button>
  );
};

export default CheerButton;
