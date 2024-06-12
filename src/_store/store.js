import { configureStore } from '@reduxjs/toolkit';
import rootReducer from '../_reducers/rootReducer';

export const store = configureStore({
  reducer: rootReducer,
});

export default store;
