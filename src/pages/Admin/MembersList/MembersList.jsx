import styles from './MembersList.module.css';
import ListTable from '../../../components/List/ListTable';

const MembersList = () => {
  return (
    <div className={styles.MembersList}>
      <h2>회원목록</h2>
      <ListTable>
        <thead>
          <tr>
            <th>번호</th>
            <th>이름</th>
            <th>닉네임</th>
            <th>이메일</th>
            <th>휴대전화</th>
            <th>회원등급</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
          </tr>
        </tbody>
      </ListTable>
    </div>
  );
};

export default MembersList;
