import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  wishlistCount: 0,
  isWished: false,
};

export const wishlistSlice = createSlice({
  name: 'wishlist',
  initialState,
  reducers: {
    setWishlistCount: (state, action) => {
      state.wishlistCount = Number(action.payload);
    },
    setIsWished: (state, action) => {
      state.isWished = action.payload;
    },
    incrementWishlistCount: (state) => {
      state.wishlistCount += 1;
    },
    decrementWishlistCount: (state) => {
      state.wishlistCount -= 1;
    },
  },
});

export const {
  setWishlistCount,
  setIsWished,
  incrementWishlistCount,
  decrementWishlistCount,
} = wishlistSlice.actions;

export default wishlistSlice.reducer;
