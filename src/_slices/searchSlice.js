import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  searchData: [],
};

const searchSlice = createSlice({
  name: 'search',
  initialState,
  reducers: {
    setData: (state, action) => {
      state.searchData = action.payload;
    },
    resetData: (state) => {
      state.searchData = [];
    },
  },
});

export const { setData, resetData } = searchSlice.actions;

export default searchSlice.reducer;
