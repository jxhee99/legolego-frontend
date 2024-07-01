import React from 'react';
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';

const ToggleFilter = ({ filter, handleChange, buttons }) => {
  return (
    <ToggleButtonGroup
      color="primary"
      value={filter}
      exclusive
      onChange={handleChange}
      aria-label="Filter"
    >
      {buttons.map((button) => (
        <ToggleButton
          key={button.value}
          value={button.value}
          sx={{
            borderRadius: '12px',
            height: 32,
          }}
        >
          {button.label}
        </ToggleButton>
      ))}
    </ToggleButtonGroup>
  );
};

export default ToggleFilter;
