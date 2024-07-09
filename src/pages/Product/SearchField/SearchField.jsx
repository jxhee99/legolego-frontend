import React from 'react';
import { TextField, InputAdornment } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import styles from './SearchField.module.css';

const SearchField = ({ onChange, value }) => {
  return (
    <TextField
      variant="outlined"
      placeholder="패키지 상품을 검색하세요"
      value={value}
      onChange={onChange}
      InputProps={{
        classes: {
          root: styles.searchInputRoot,
          input: styles.searchInput,
          notchedOutline: styles.searchInputFieldset, // Corrected placement
        },
        startAdornment: (
          <InputAdornment position="start" className={styles.inputAdornment}>
            <SearchIcon className={styles.searchIcon} />
          </InputAdornment>
        ),
      }}
      style={{ width: '100%' }}
    />
  );
};

export default SearchField;
