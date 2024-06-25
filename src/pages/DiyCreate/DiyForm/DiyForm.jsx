// DiyForm.jsx
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import axios from 'axios';
import styles from './DiyForm.module.css';

import { useSelector } from 'react-redux';
import {
  selectAirline,
  selectRoute,
  selectDetailCourses,
} from '../../../_slices/diySlice';

const DiyForm = () => {
  const [packageName, setPackageName] = useState('');
  const [shortDesc, setShortDesc] = useState('');
  const navigate = useNavigate();
  const airline = useSelector(selectAirline);
  const route = useSelector(selectRoute);
  const detailCourses = useSelector(selectDetailCourses);

  const handlePackageNameChange = (e) => {
    setPackageName(e.target.value);
  };

  const handleShortDescChange = (e) => {
    setShortDesc(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = {
      airline: airline,
      route: route,
      detailCourses: detailCourses,
      packageForm: {
        packageName: packageName,
        shortDescription: shortDesc,
      },
      userNum: 1,
    };

    console.log(formData);
    try {
      const response = await axios.post(`/api/packages`, formData);

      if (response.status === 201) {
        // 요청이 성공한 경우
        console.log('승인');
        const packageNum = response.data;
        navigate(`/diy/${packageNum}`);
      } else {
        console.error('승인 실패:', response.status);
      }
    } catch (err) {
      console.error('등록 중 오류:', err);
    }
  };

  return (
    <div className={styles.form_box}>
      <h2>패키지 정보 입력</h2>
      <form onSubmit={handleSubmit}>
        <div className={styles.form_group_}>
          <label>패키지 이름:</label>
          <input
            type="text"
            value={packageName}
            onChange={handlePackageNameChange}
          />
        </div>
        <div className={styles.form_group_}>
          <label>짧은 설명:</label>
          <textarea
            value={shortDesc}
            onChange={handleShortDescChange}
            rows={4}
          />
        </div>
        <button type="submit" className={styles.submit_btn_}>
          제출
        </button>
      </form>
    </div>
  );
};

export default DiyForm;
