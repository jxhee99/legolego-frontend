import React, { useEffect, useState } from 'react';
import styles from '../ProfileSetting.module.css';
import Input from '../../../../components/Form/Input/Input';
import axios from 'axios';

const ProfileInformation = () => {
  const [profile, setProfile] = useState({
    userNickname: '',
    userEmail: '',
    userPhone: ''
  });
  const [editMode, setEditMode] = useState(false); // 수정 모드 상태 추가
  const [tempProfile, setTempProfile] = useState(null); // 임시 프로필 상태 추가

  useEffect(() => {
    fetchProfile();
  }, []);

  const fetchProfile = async () => {
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        throw new Error('Token is not available');
      }

      const response = await axios.get('/api/my/profile', {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
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

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProfile({
      ...profile,
      [name]: value
    });
  };

  const handleEditClick = () => {
    setTempProfile({ ...profile }); // 현재 프로필을 임시로 저장
    setEditMode(true); // 수정 모드로 변경
  };

  const handleCancelClick = () => {
    setProfile(tempProfile); // 수정 이전 상태로 복구
    setEditMode(false); // 수정 모드 종료
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        throw new Error('Token is not available');
      }

      const response = await axios.patch('/api/my/profile', profile, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      console.log('Profile updated:', response.data);
      // 프로필 업데이트 성공 시 메시지를 보여줄 수 있음
      alert('프로필이 성공적으로 업데이트되었습니다.');
      // 업데이트 후 프로필을 다시 불러올 수 있도록 fetchProfile() 호출
      fetchProfile();
      setEditMode(false); // 입력 필드 숨기기
    } catch (error) {
      console.error('프로필 업데이트 중 오류가 발생했습니다.', error);
      // 실패 시 에러 메시지를 보여줄 수 있음
      alert('프로필 업데이트 중 오류가 발생했습니다.');
    }
  };

  return (
    <form className={styles.ProfileInformation} onSubmit={handleSubmit}>
      <div>
        {!editMode && (
          <div>
            <strong>아이디(닉네임):</strong> {profile.userNickname}
          </div>
        )}
        {editMode && (
          <Input
            id="id"
            type="text"
            text="아이디(닉네임)"
            value={profile.userNickname}
            onChange={handleChange}
            className={styles.input}
          />
        )}
      </div>
      <div>
        <strong>이메일:</strong> {profile.userEmail}
      </div>
      <div>
        {!editMode && (
          <div>
            <strong>연락처:</strong> {profile.userPhone}
          </div>
        )}
        {editMode && (
          <Input
            id="tel"
            type="text"
            text="연락처"
            value={profile.userPhone}
            onChange={handleChange}
            className={styles.input}
          />
        )}
      </div>
      {!editMode ? (
        <button onClick={handleEditClick}>수정하기</button>
      ) : (
        <>
          <button type="submit">저장하기</button>
          <button type="button" onClick={handleCancelClick}>돌아가기</button>
        </>
      )}
    </form>
  );
};

export default ProfileInformation;
