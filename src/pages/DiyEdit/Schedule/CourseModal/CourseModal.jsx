import styles from './CourseModal.module.css';
import MapComponent from './MapComponent';

const CourseModal = ({ isVisible, closeModal, date }) => {
  if (!isVisible) return null;

  const handleBackgroundClick = (event) => {
    // 모달 바깥쪽을 클릭한 경우에 closeModal 호출
    if (event.target === event.currentTarget) {
      closeModal();
    }
  };

  return (
    <div className={styles.CourseModal} onClick={handleBackgroundClick}>
      <div className={styles.modal_layout} onClick={(e) => e.stopPropagation()}>
        <button className={styles.modal_close_button} onClick={closeModal}>
          x
        </button>
        <h5>{`${date} - 장소추가`}</h5>
        <MapComponent date={date} closeModal={closeModal} />
      </div>
    </div>
  );
};

export default CourseModal;
