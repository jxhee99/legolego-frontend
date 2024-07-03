import React, { useEffect, useState } from 'react';
import styles from '../ProfileSetting.module.css';
import apiClient from '../../../../api/apiClient';

const ProfileInformation = () => {
  const [profile, setProfile] = useState({
    userNickname: '',
    userEmail: '',
    userPhone: ''
  });

  useEffect(() => {
    fetchProfile();
  }, []);

  const fetchProfile = async () => {
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        throw new Error('Token is not available');
      }

      const response = await apiClient.get('/my/profile');
      const data = response.data;
      if (data) {
        console.log('Fetched data:', data);
        setProfile({
          userNickname: data.userNickname || '',
          userEmail: data.userEmail || '',
          userPhone: data.userPhone || '',
        });
      }
    } catch (error) {
      console.error('프로필을 가져오는 중 오류가 발생했습니다.', error);
    }
  };

  const handleUpdateProfile = async () => {
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        throw new Error('Token is not available');
      }

      const response = await apiClient.patch('/my/profile', {
        userNickname: profile.userNickname,
        userPhone: profile.userPhone
      });
      console.log('Profile updated:', response.data);
      alert('프로필이 성공적으로 업데이트되었습니다.');
      fetchProfile(); // 프로필 다시 가져오기
    } catch (error) {
      console.error('프로필 업데이트 중 오류가 발생했습니다.', error);
      alert('프로필 변경사항이 없습니다.');
    }
  };

  const handleChange = (e) => {
    const { id, value } = e.target;
    setProfile({
      ...profile,
      [id]: value
    });
  };

  return (
    <div>
      <form className={styles.ProfileInformation}>
        <div className={styles.formGroup}>
          <p>Email</p>
          <input 
            defaultValue={profile.userEmail} 
            type="email" 
            id="userEmail" 
            className={`${styles.profile_input} ${styles.readOnlyInput}`} 
            readOnly 
          />
        </div>
        <div className={styles.formGroup}>
          <p>Nickname</p>
          <input 
            value={profile.userNickname} 
            type="text" 
            id="userNickname" 
            className={`${styles.profile_input} ${styles.redText}`} 
            onChange={handleChange} 
          />
        </div>
        <div className={styles.formGroup}>
          <p>Phone</p>
          <input 
            value={profile.userPhone} 
            type="text" 
            id="userPhone" 
            className={`${styles.profile_input} ${styles.redText}`} 
            onChange={handleChange} 
          />
        </div>
      </form>
      <button 
              className={`${styles.profile_edit}`} onClick={handleUpdateProfile}>수정하기</button>
    </div>
  );
};

export default ProfileInformation;
