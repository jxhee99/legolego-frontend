import styles from '../../../components/Profile/Profile.module.css';
import { useState, useEffect } from 'react';
import apiClient from '../../../api/apiClient';
import PasswordChange from '../../../components/Profile/PasswordChange';

const PartnerProfile = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [editMode, setEditMode] = useState(false);
  const [phone, setPhone] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await apiClient.get('/partner/profile');
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

  const handleEditClick = () => {
    setEditMode(true);
  };

  const handlePhoneChange = (event) => {
    setPhone(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await apiClient.patch('/partner/profile', {
        partnerPhone: phone,
      });
      setData(response.data);
      setEditMode(false);
    } catch (error) {
      setError(error);
    }
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <div className={styles.formContainer}>
      <h3>프로필 관리</h3>
      <form>
        <div className={styles.Input}>
          <label htmlFor="name">이름</label>
          <div>{data.companyName}</div>
        </div>
        <div className={styles.Input}>
          <label htmlFor="email">이메일</label>
          <div>{data.partnerEmail}</div>
        </div>
        <div className={styles.Input}>
          <label htmlFor="phone">전화번호</label>
          <input
            type="text"
            id="phone"
            value={phone}
            readOnly={!editMode}
            onChange={handlePhoneChange}
            className={editMode ? styles.active : ''}
          />
        </div>
        {editMode ? (
          <button
            className={styles.button}
            type="button"
            onClick={handleSubmit}
          >
            제출
          </button>
        ) : (
          <button
            className={styles.button}
            type="button"
            onClick={handleEditClick}
          >
            전화번호 변경
          </button>
        )}
      </form>
      <br></br>
      <h3>비밀번호 변경</h3>
      <PasswordChange endpoint={'/partner/profile/password'} />
    </div>
  );
};

export default PartnerProfile;
