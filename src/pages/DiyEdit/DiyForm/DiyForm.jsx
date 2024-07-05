// DiyForm.jsx
import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import apiClient from '../../../api/apiClient';
import styles from '../../DiyCreate/DiyForm/DiyForm.module.css';
import DiyFlightCard from '../../../components/Diy/DiyFlightCard';
import DiySchedule from '../../../components/Diy/DiySchedule';

import { useSelector, useDispatch } from 'react-redux';
import {
  selectAirline,
  selectDetailCourses,
  selectPackageForm,
  selectRoute,
  resetForm,
} from '../../../_slices/diySlice';

const DiyForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const airline = useSelector(selectAirline);
  const detailCourses = useSelector(selectDetailCourses);
  const route = useSelector(selectRoute);
  const packageForm = useSelector(selectPackageForm);
  const [packageName, setPackageName] = useState(packageForm.packageName);
  const [shortDesc, setShortDesc] = useState(packageForm.shortDescription);

  const handlePackageNameChange = (e) => {
    setPackageName(e.target.value);
  };

  const handleShortDescChange = (e) => {
    setShortDesc(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = {
      detailCourses: detailCourses,
      packageForm: {
        packageName: packageName,
        shortDescription: shortDesc,
      },
    };

    console.log(formData);
    try {
      const token = localStorage.getItem('token');
      const response = await apiClient.put(`/user/packages/${id}`, formData);

      if (response.status === 200) {
        // 요청이 성공한 경우
        console.log('승인');
        navigate(`/diy/${id}`);
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
      <h4>항공편</h4>
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
      <h4>일정</h4>
      <div className={styles.schedule_box}>
        <DiySchedule detaileCourses={detailCourses} />
      </div>
      <h4>레고 만들기</h4>
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
