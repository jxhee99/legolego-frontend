// features/auth/authSlice.js
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  user: null,
  isAuthenticated: false,
  signUpStatus: 'idle', // 'idle' | 'loading' | 'succeeded' | 'failed'
  signUpError: null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    login: (state, action) => {
      state.user = action.payload;
      state.isAuthenticated = true;
    },
    logout: (state) => {
      state.user = null;
      state.isAuthenticated = false;
    },
    signUpRequest: (state) => {
      state.signUpStatus = 'loading';
    },
    signUpSuccess: (state, action) => {
      state.signUpStatus = 'succeeded';
      state.user = action.payload;
      state.isAuthenticated = true;
      state.signUpError = null;
    },
    signUpFailure: (state, action) => {
      state.signUpStatus = 'failed';
      state.signUpError = action.payload;
    },
  },
});

export const { login, logout, signUpRequest, signUpSuccess, signUpFailure } =
  authSlice.actions;

export default authSlice.reducer;
