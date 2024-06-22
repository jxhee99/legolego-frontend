import * as React from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import { OPTIONS } from '../../../constans/options';

export default function CountrySelect() {
  return (
    <Autocomplete
      id="country-select-demo"
      sx={{ width: 300 }}
      options={OPTIONS}
      autoHighlight
      getOptionLabel={(option) => option || ''}
      renderOption={(props, option) => {
        const [code, label] = option.split(', ');
        return (
          <Box
            component="li"
            sx={{ '& > img': { mr: 2, flexShrink: 0 } }}
            {...props}
          >
            {label} ({code})
          </Box>
        );
      }}
      renderInput={(params) => (
        <TextField
          {...params}
          label="어디로 여행가고 싶으신가요?"
          inputProps={{
            ...params.inputProps,
            autoComplete: 'new-password',
          }}
        />
      )}
    />
  );
}
