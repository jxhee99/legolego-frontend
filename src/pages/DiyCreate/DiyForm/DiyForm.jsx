// DiyForm.jsx
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import axios from 'axios';
import styles from './DiyForm.module.css';
import DiyFlightCard from '../../../components/Diy/DiyFlightCard';
import DiySchedule from '../../../components/Diy/DiySchedule';

import { useSelector, useDispatch } from 'react-redux';
import {
  selectAirline,
  selectRoute,
  selectDetailCourses,
  resetForm,
} from '../../../_slices/diySlice';

const DiyForm = () => {
  const [packageName, setPackageName] = useState('');
  const [shortDesc, setShortDesc] = useState('');
  const navigate = useNavigate();
  const dispatch = useDispatch();
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
    };

    console.log(formData);
    try {
      const token = localStorage.getItem('token');
      const response = await axios.post(`/api/user/packages`, formData, {
        headers: {
          Accept: 'application/json',
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.status === 201) {
        // 요청이 성공한 경우
        console.log('승인');
        const packageNum = response.data;
        navigate(`/diy/${packageNum}`);
        // 폼 초기화
        setPackageName('');
        setShortDesc('');
        dispatch(resetForm());
      } else {
        console.error('승인 실패:', response.status);
      }
    } catch (err) {
      console.error('등록 중 오류:', err);
    }
  };

  if (!detailCourses[0]) {
    return <div>항공편과 일정을 먼저 선택해주세요</div>;
  }

  return (
    <div className={styles.container}>
      <h3>항공편</h3>
      <div className={styles.flight_box}>
        <DiyFlightCard
          flight={{
            flightNum: airline.startFlightNum,
            date: airline.boardingDate,
            airlineName: airline.startAirlineName,
            startingPoint: airline.startingPoint,
            destination: airline.destination,
          }}
          type={'departure'}
        />
        <DiyFlightCard
          flight={{
            flightNum: airline.comeFlightNum,
            date: airline.comingDate,
            airlineName: airline.comeAirlineName,
            startingPoint: airline.destination,
            destination: airline.startingPoint,
          }}
        />
      </div>
      <h3>일정</h3>
      <div className={styles.schedule_box}>
        <DiySchedule detaileCourses={detailCourses} />
      </div>
      <h3>레고 만들기</h3>
      <div className={styles.form_box}>
        <form onSubmit={handleSubmit}>
          <div className={styles.form_group_}>
            <label>패키지 이름</label>
            <input
              type="text"
              value={packageName}
              onChange={handlePackageNameChange}
            />
          </div>
          <div className={styles.form_group_}>
            <label>짧은 설명</label>
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
    </div>
  );
};

export default DiyForm;
