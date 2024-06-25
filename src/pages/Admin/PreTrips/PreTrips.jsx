import styles from './PreTrips.module.css';
import ListTable from '../../../components/List/ListTable';

const PreTrips = () => {
  return (
    <div className={styles.PreTrips}>
      <h2>지난 여행 목록</h2>
      <ListTable>
        <thead>
          <tr>
            <th>상품 번호</th>
            <th>Name</th>
            <th>작성자</th>
            <th>마감일</th>
            <th>모집확정</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>1</td>
            <td>2</td>
            <td>3</td>
            <td>4</td>
            <td>5</td>
          </tr>
          <tr>
            <td>1</td>
            <td>2</td>
            <td>3</td>
            <td>4</td>
            <td>5</td>
          </tr>
        </tbody>
      </ListTable>
    </div>
  );
};

export default PreTrips;
