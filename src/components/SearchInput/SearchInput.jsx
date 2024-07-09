import React from 'react';
import { useState } from 'react';
import Autocomplete from '@mui/material/Autocomplete';
import { OPTIONS } from '../../constans/options';
import { month } from '../../constans/month';
import TextField from '@mui/material/TextField';
import apiClient from '../../api/apiClient';

const SearchInput = ({ labelName, setData }) => {
  const [destinationValue, setDestinationValue] = useState(null);
  const [monthValue, setMonthValue] = useState(null);
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
    if (destinationValue != null) {
      destination = destinationValue.slice(5);
    }
    let month = '';
    if (monthValue != null) {
      month = parseInt(monthValue.slice(0, -1));
    }
    try {
      // 예시 URL, 실제로 사용할 URL에 맞게 수정해야 합니다.
      const url = `/packages/searched?destination=${destination}&month=${month}`;
      console.log(url);
      // Axios를 사용하여 GET 요청 보내기
      const response = await apiClient.get(url);

      // 요청 성공 시 처리할 로직
      console.log(response.data); // 예시: 서버 응답 데이터
      setData(response.data);
    } catch (error) {
      // 요청 실패 시 처리할 로직
      console.error('Error fetching data: ', error);
    }
  };
  return (
    <div>
      <Autocomplete
        value={destinationValue || inputValue}
        onChange={handleDestinationChange}
        inputValue={inputValue}
        onInputChange={(event, newInputValue) => {
          setInputValue(newInputValue);
          console.log(inputValue);
        }}
        id="controllable-states-demo"
        options={OPTIONS}
        sx={{
          width: 300,
        }}
        renderInput={(params) => <TextField {...params} label={labelName} />}
      />
      <Autocomplete
        disablePortal
        value={monthValue}
        onChange={handleMonthValue}
        id="combo-box-demo"
        options={month}
        sx={{ width: 300 }}
        renderInput={(params) => <TextField {...params} label={labelName} />}
      />
      <button onClick={handleSubmit}>검색</button>
    </div>
  );
};

export default SearchInput;
