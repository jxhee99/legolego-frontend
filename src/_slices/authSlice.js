import { createSlice } from '@reduxjs/toolkit';

// 초기 상태 설정
const initialState = {
  token: null,
  isAuthenticated: false,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    login: (state, action) => {
      state.token = action.payload;
      state.isAuthenticated = true;
      sessionStorage.setItem('token', action.payload);
    },
    logout: (state) => {
      state.token = null;
      state.isAuthenticated = false;
      sessionStorage.removeItem('token');
    },
    checkAuth: (state) => {
      const token = sessionStorage.getItem('token');
      if (token) {
        state.token = token;
        state.isAuthenticated = true;
      } else {
        state.token = null;
        state.isAuthenticated = false;
      }
    },
  },
});

export const { login, logout, checkAuth } = authSlice.actions;

export default authSlice.reducer;
