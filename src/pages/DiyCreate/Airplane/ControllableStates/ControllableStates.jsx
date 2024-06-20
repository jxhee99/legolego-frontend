import { useState } from 'react';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import { OPTIONS } from '../../../../constans/options';

export default function ControllableStates({ labelName, setLocation }) {
  const [value, setValue] = useState('');
  const [inputValue, setInputValue] = useState('');

  const handleChange = (event, newValue) => {
    setValue(newValue);
    setLocation(newValue);
  };

  return (
    <Autocomplete
      value={value}
      onChange={handleChange}
      inputValue={inputValue}
      onInputChange={(event, newInputValue) => {
        setInputValue(newInputValue);
      }}
      id="controllable-states-demo"
      options={OPTIONS}
      sx={{ width: 300 }}
      renderInput={(params) => <TextField {...params} label={labelName} />}
    />
  );
}
