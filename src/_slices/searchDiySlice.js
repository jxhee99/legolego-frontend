import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  searchData: [],
  destination: '',
  month: '',
};

const searchDiySlice = createSlice({
  name: 'search',
  initialState,
  reducers: {
    setSearchData: (state, action) => {
      state.searchData = action.payload;
    },
    resetData: (state) => {
      state.searchData = [];
      state.destination = '';
      state.month = '';
    },
    setDestination: (state, action) => {
      state.destination = action.payload
    },
    setMonth: (state, action) => {
      state.month = action.payload
    }
  },
});

export const { setSearchData, resetData, destination, month, setDestination, setMonth } = searchDiySlice.actions;

export default searchDiySlice.reducer;
