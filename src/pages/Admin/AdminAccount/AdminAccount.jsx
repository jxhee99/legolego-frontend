import styles from '../../../components/Profile/Profile.module.css';
import { useState, useEffect } from 'react';
import apiClient from '../../../api/apiClient';
import PasswordChange from '../../../components/Profile/PasswordChange';

const AdminAccount = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [editMode, setEditMode] = useState(false);
  const [phone, setPhone] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await apiClient.get('/admin/profile');
        setData(response.data);
        setPhone(response.data.partnerPhone); // 전화번호 초기값 설정
        setLoading(false);
      } catch (error) {
        setError(error);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;
  console.log(data);

  return (
    <div className={styles.formContainer}>
      <h3>프로필 관리</h3>
      <form>
        <div className={styles.Input}>
          <label htmlFor="name">이름</label>
          <div>{data.adminName}</div>
        </div>
        <div className={styles.Input}>
          <label htmlFor="email">이메일</label>
          <div>{data.adminEmail}</div>
        </div>
      </form>
      <br></br>
      <h3>비밀번호 변경</h3>
      <PasswordChange endpoint={'/admin/profile/password'} />
    </div>
  );
};

export default AdminAccount;
