import styles from './PreTrips.module.css';
import ListTable from '../../../components/List/ListTable';

const PreTrips = () => {
  return (
    <div className={styles.PreTrips}>
      <h2>지난 여행 목록</h2>
      <ListTable>
        <thead>
          <tr>
            <th>패키지 번호</th>
            <th>상품명</th>
            <th>단계</th>
            <th>여행사/가격</th>
            <th>날짜</th>
            <th>작성자</th>
            <th>승인/반려</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>1</td>
            <td>2</td>
            <td>3</td>
            <td>4</td>
            <td>5</td>
            <td>6</td>
            <td>7</td>
          </tr>
          <tr>
            <td>1</td>
            <td>2</td>
            <td>3</td>
            <td>4</td>
            <td>5</td>
            <td>6</td>
            <td>7</td>
          </tr>
        </tbody>
      </ListTable>
    </div>
  );
};

export default PreTrips;
