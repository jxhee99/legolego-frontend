import styles from './CourseModal.module.css';
import MapComponent from './MapComponent';

const CourseModal = ({ isVisible, closeModal, date }) => {
  if (!isVisible) return null;

  return (
    <div className={styles.CourseModal}>
      <div className={styles.modal_layout}>
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
