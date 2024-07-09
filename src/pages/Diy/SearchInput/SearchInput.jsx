import React, { useEffect, useState } from 'react';
import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';
import RestartAltIcon from '@mui/icons-material/RestartAlt';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useLocation } from 'react-router-dom';
import {
  setSearchData,
  resetData,
  setDestination,
  setMonth,
} from '../../../_slices/searchDiySlice';
import apiClient from '../../../api/apiClient';
import { month, destination } from '../../../constans/search';
import styles from './SearchInput.module.css';

const SearchInput = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const query = new URLSearchParams(location.search);
  const isSearched = query.get('searched'); // URL 파라미터에서 'searched' 값 가져오기

  // Redux 상태에서 검색 관련 데이터 가져오기
  const searchState = useSelector((state) => state.search);
  const searchedDestination = isSearched ? searchState.destination : '';
  const searchedMonth = isSearched ? searchState.month : '';

  // 로컬 상태 정의 및 초기값 설정
  const [destinationValue, setDestinationValue] = useState(searchedDestination);
  const [monthValue, setMonthValue] = useState(searchedMonth);

  // 목적지 변경 핸들러
  const handleDestinationChange = (event, newValue) => {
    setDestinationValue(newValue);
  };

  // 월 변경 핸들러
  const handleMonthValue = (event, newValue) => {
    setMonthValue(newValue);
  };

  // 검색 제출 핸들러
  const handleSubmit = async () => {
    try {
      // 입력값 확인 및 처리
      const destination = destinationValue || '';
      const month = parseInt(monthValue?.slice(0, -1), 10) || '';

      // API 요청 URL 생성
      const url = `/packages/searched?destination=${destination}&month=${month}`;
      const response = await apiClient.get(url);

      // Redux 상태 업데이트
      dispatch(setSearchData(response.data));
      dispatch(setDestination(destinationValue));
      dispatch(setMonth(monthValue));

      // URL 파라미터 업데이트 후 페이지 이동
      const searchParams = new URLSearchParams(location.search);
      searchParams.set('searched', 'true');
      navigate(`${location.pathname}?${searchParams.toString()}`);
    } catch (error) {
      console.error('데이터를 가져오는 중 오류 발생: ', error);
    }
  };

  // 검색 리셋 핸들러
  const handleReset = () => {
    // Redux 상태 초기화
    dispatch(resetData());
    // 로컬 상태 초기화
    setDestinationValue('');
    setMonthValue('');

    // URL 파라미터 제거 후 페이지 이동
    const searchParams = new URLSearchParams(location.search);
    searchParams.delete('searched');
    navigate(`${location.pathname}?${searchParams.toString()}`);
  };

  return (
    <div className={styles.searchBox}>
      {/* 목적지 입력 필드 */}
      <Autocomplete
        disablePortal
        value={destinationValue}
        onChange={handleDestinationChange}
        id="destination-autocomplete"
        options={destination}
        sx={{
          width: 300,
          '& .MuiInputBase-root': { height: '48px' },
        }}
        renderInput={(params) => <TextField {...params} label="목적지" />}
      />
      {/* 월 선택 필드 */}
      <Autocomplete
        disablePortal
        value={monthValue}
        onChange={handleMonthValue}
        id="month-autocomplete"
        options={month}
        sx={{
          width: 100,
          '& .MuiInputBase-root': { height: '48px' },
        }}
        renderInput={(params) => <TextField {...params} label="월" />}
      />
      {/* 검색 버튼 */}
      <button className={styles.search_button} onClick={handleSubmit}>
        검색
      </button>
      {/* 리셋 아이콘 */}
      <RestartAltIcon onClick={handleReset} style={{ cursor: 'pointer' }} />
    </div>
  );
};

export default SearchInput;
