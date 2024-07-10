import React from 'react';
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import { createTheme } from '@mui/material/styles';
import { ThemeProvider } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    primary: {
      main: '#d1b10e',
    },
  },
  typography: {
    fontFamily: ['SpoqaHanSansNeo-Regular', 'Arial', 'san-serif'].join(','),
    fontSize: 16,
  },
});

const ToggleFilter = ({ filter, handleChange, buttons }) => {
  return (
    <ThemeProvider theme={theme}>
      <ToggleButtonGroup
        value={filter}
        exclusive
        aria-label="Filter"
        // color="primary"
      >
        {buttons.map((button) => (
          <ToggleButton
            key={button.value}
            value={button.value}
            onChange={handleChange}
            sx={{
              height: 36,
              color: '#3d3d3d',
              '&.Mui-selected': {
                color: '#81b7e0',
                backgroundColor: '#fff',
                '&:hover': {
                  color: '#81b7e0',
                  backgroundColor: '#fff',
                },
              },
            }}
          >
            {button.label}
          </ToggleButton>
        ))}
      </ToggleButtonGroup>
    </ThemeProvider>
  );
};

export default ToggleFilter;
