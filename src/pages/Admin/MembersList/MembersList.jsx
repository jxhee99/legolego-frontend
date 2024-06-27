import styles from '../../../components/List/List.module.css';
import ListTable from '../../../components/List/ListTable';
import { useEffect } from 'react';
import useFetchData from '../../../hooks/useFetchDiyData';

const MembersList = () => {
  const { data, loading, refetch } = useFetchData(endpoint);
  const endpoint = '/api/admin/all-members';

  return (
    <div className={styles.box}>
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
