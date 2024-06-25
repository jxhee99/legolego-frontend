import React from 'react';
import { useState, useEffect } from 'react';
import axios from 'axios';

import { useSelector, useDispatch } from 'react-redux';
import {
  updateCourseNames,
  selectRoute,
  selectDetailCourses,
} from '../../../_slices/diySlice';

const DiyForm = () => {
  const [packageName, setPackageName] = useState('');
  const [shortDesc, setShortDesc] = useState('');
  const [startFlight, setStartFlight] = useState('');
  const [returnFlight, setReturnFlight] = useState('');

  const route = useSelector(selectRoute);
  const dispatch = useDispatch();
  const detailCourses = useSelector(selectDetailCourses);

  useEffect(() => {
    // 로컬 스토리지에서 'startFlight' 값 가져오기
    const startFlight = localStorage.getItem('startFlight');
    if (startFlight) {
      // JSON 문자열을 객체로 변환
      const jsonData = JSON.parse(startFlight);
      setStartFlight(jsonData);
    }
    const returnFlight = localStorage.getItem('returnFlight');
    if (returnFlight) {
      // JSON 문자열을 객체로 변환
      const jsonData = JSON.parse(returnFlight);
      setReturnFlight(jsonData);
    }
  }, []);

  const handlePackageNameChange = (e) => {
    setPackageName(e.target.value);
  };

  const handleShortDescChange = (e) => {
    setShortDesc(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = {
      airline: {
        startAirlineName: startFlight.airlineKorean,
        startingPoint: returnFlight.city,
        destination: startFlight.city,
        startFlightNum: startFlight.internationalNum,
        boardingDate: '2024-06-15T10:00:00',
        comeAirlineName: returnFlight.airlineKorean,
        comeFlightNum: returnFlight.internationalNum,
        comingDate: '2024-06-15T10:00:00',
      },
      route: {
        startDate: route.startDate,
        lastDate: route.lastDate,
      },
      detailCourses: detailCourses,
      packageForm: {
        packageName: packageName,
        profileImg: '/img/google/city',
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
      } else {
        console.error('승인 실패:', response.status);
      }
    } catch (err) {
      console.error('등록 중 오류:', err);
    }
  };

  return (
    <div>
      <h2>패키지 정보 입력</h2>
      <form onSubmit={handleSubmit}>
        <label>
          패키지 이름:
          <input
            type="text"
            value={packageName}
            onChange={handlePackageNameChange}
          />
        </label>
        <br />
        <label>
          짧은 설명:
          <textarea value={shortDesc} onChange={handleShortDescChange} />
        </label>
        <button type="submit">제출</button>
      </form>
    </div>
  );
};

export default DiyForm;
