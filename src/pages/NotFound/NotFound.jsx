import Metas from '../../components/common/Metas';
import styles from './NotFound.module.css';
import { useNavigate } from 'react-router-dom';

const NotFound = () => {
  const navigate = useNavigate();

  return (
    <>
      <Metas title="NotFound" />
      <div className={styles.NotFound}>
        <h2>404 Not Found</h2>
        <p>페이지가 존재하지 않습니다.</p>
        <button onClick={() => navigate(-1)}>이전으로 돌아가기</button>
      </div>
    </>
  );
};

export default NotFound;
