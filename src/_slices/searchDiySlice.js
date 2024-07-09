import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  searchData: [],
  destination: '',
  month: '',
  overLikeData: []
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
      state.overLikeData = [];
    },
    setDestination: (state, action) => {
      state.destination = action.payload;
    },
    setMonth: (state, action) => {
      state.month = action.payload;
    },
    setOverLikeData: (state, action) => {
      state.overLikeData = action.payload;
    }
  },
});

export const {
  setSearchData,
  resetData,
  setDestination,
  setMonth,
  setOverLikeData
} = searchDiySlice.actions;

export default searchDiySlice.reducer;
