import styles from './Design.module.css';

const LegoHead = ({ step }) => {
  return (
    <div className={styles.lego_head}>
      <div className={` ${step ? styles.active : ''}`}></div>
      <div className={`${step ? styles.active : ''}`}></div>
    </div>
  );
};

export default LegoHead;
