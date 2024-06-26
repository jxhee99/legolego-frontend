import { createSlice } from '@reduxjs/toolkit';

// 초기 상태 설정
const initialState = {
  token: null,
  isAuthenticated: false,
  userNum: null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    login: (state, action) => {
      state.token = action.payload.token;
      state.isAuthenticated = true;
      state.userNum = action.payload.userNum;
      sessionStorage.setItem('token', action.payload.token);
      sessionStorage.setItem('userNum', action.payload.userNum);
    },
    logout: (state) => {
      state.token = null;
      state.isAuthenticated = false;
      state.userNum = null;
      sessionStorage.removeItem('token');
      sessionStorage.removeItem('userNum');
    },
    checkAuth: (state) => {
      const token = sessionStorage.getItem('token');
      const userNum = sessionStorage.getItem('userNum');
      if (token && userNum) {
        state.token = token;
        state.isAuthenticated = true;
        state.userNum = userNum;
      } else {
        state.token = null;
        state.isAuthenticated = false;
        state.userNum = null;
      }
    },
  },
});

export const { login, logout, checkAuth } = authSlice.actions;

export default authSlice.reducer;
