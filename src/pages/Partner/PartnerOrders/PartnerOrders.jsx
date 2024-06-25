import styles from './PartnerOrders.module.css';
import ListTable from '../../../components/List/ListTable';

const PartnerOrders = () => {
  return (
    <div className={styles.PartnerOrders}>
      <h2>여행 상품 목록</h2>
      <ListTable>
        <thead>
          <tr>
            <th>패키지 번호</th>
            <th>이름</th>
            <th>작성자</th>
            <th>좋아요 수</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>1</td>
            <td>2</td>
            <td>3</td>
            <td>4</td>
          </tr>
          <tr>
            <td>1</td>
            <td>2</td>
            <td>3</td>
            <td>4</td>
          </tr>
        </tbody>
      </ListTable>
    </div>
  );
};

export default PartnerOrders;
