import React, { useEffect, useState } from 'react';
import Autocomplete from '@mui/material/Autocomplete';
import RestartAltIcon from '@mui/icons-material/RestartAlt';
import { OPTIONS } from '../../constans/options';
import { month } from '../../constans/month';
import TextField from '@mui/material/TextField';
import apiClient from '../../api/apiClient';
import {
  setSearchData,
  resetData,
  setDestination,
  setMonth,
} from '../../_slices/searchDiySlice';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useLocation } from 'react-router-dom';
import styles from './SearchInput.module.css';

const SearchInput = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const searchState = useSelector((state) => state.search); // 전체 search state 가져오기

  const [destinationValue, setDestinationValue] = useState(
    searchState.destination || null
  );
  const [monthValue, setMonthValue] = useState(searchState.month || null);
  const [inputValue, setInputValue] = useState('');

  const handleDestinationChange = (event, newValue) => {
    setDestinationValue(newValue);
    console.log(newValue);
  };

  const handleMonthValue = (event, newValue) => {
    setMonthValue(newValue);
    console.log(newValue);
  };

  const handleSubmit = async () => {
    let destination = '';
    if (destinationValue) {
      destination = destinationValue.slice(5);
    }
    let month = '';
    if (monthValue) {
      month = parseInt(monthValue.slice(0, -1), 10); // 문자열을 정수로 변환
      if (isNaN(month)) {
        month = ''; // NaN이면 빈 문자열로 처리
      }
    }

    try {
      const url = `/packages/searched?destination=${destination}&month=${month}`;
      console.log(url);
      const response = await apiClient.get(url);

      console.log(response.data);

      dispatch(setSearchData(response.data));
      dispatch(setDestination(destinationValue));
      dispatch(setMonth(monthValue));
      const searchParams = new URLSearchParams(location.search);
      searchParams.set('searched', 'true');
      navigate(`${location.pathname}?${searchParams.toString()}`);
    } catch (error) {
      console.error('Error fetching data: ', error);
    }
  };

  const handleReset = () => {
    dispatch(resetData());
    setDestinationValue('');
    setMonthValue('');
    const searchParams = new URLSearchParams(location.search);
    searchParams.delete('searched');
    navigate(`${location.pathname}?${searchParams.toString()}`);
  };

  return (
    <div className={styles.searchBox}>
      <Autocomplete
        disablePortal
        value={destinationValue || inputValue}
        onChange={handleDestinationChange}
        inputValue={inputValue}
        onInputChange={(event, newInputValue) => {
          setInputValue(newInputValue);
          console.log(inputValue);
        }}
        id="combo-box-demo"
        options={OPTIONS}
        sx={{
          width: 300,
          '& .MuiInputBase-root': { height: '48px' },
        }}
        ListboxProps={{
          className: 'myCustomList',
        }}
        renderInput={(params) => <TextField {...params} label={'목적지'} />}
      />
      <Autocomplete
        disablePortal
        value={monthValue}
        onChange={handleMonthValue}
        id="combo-box-demo"
        options={month}
        sx={{
          width: 100,
          '& .MuiInputBase-root': { height: '48px' },
        }}
        renderInput={(params) => <TextField {...params} label={'월'} />}
      />
      <button className={styles.search_button} onClick={handleSubmit}>
        검색
      </button>
      <RestartAltIcon onClick={handleReset} />
    </div>
  );
};

export default SearchInput;
