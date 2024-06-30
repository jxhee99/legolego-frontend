import styles from './PreTrip.module.css';
import Metas from '../../components/common/Metas';

const PreTrip = () => {
  return (
    <>
      <Metas title="지난여행후기" />
      <section className={styles.PreTrip}>
        <h2>지난 여행을 둘러보세요! </h2>
      </section>
    </>
  );
};

export default PreTrip;
