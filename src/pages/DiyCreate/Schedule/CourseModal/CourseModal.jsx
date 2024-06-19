import styles from './CourseModal.module.css';
import MapComponent from './MapComponent';

const CourseModal = ({ isVisible, closeModal, detail }) => {
  if (!isVisible) return null;

  return (
    <div className={styles.CourseModal}>
      <div className={styles.modal_layout}>
        <button className={styles.modal_close_button} onClick={closeModal}>
          x
        </button>
        <h5>{`${detail.dayNum} - 장소추가`}</h5>
        <MapComponent detail={detail} />
      </div>
    </div>
  );
};

export default CourseModal;
