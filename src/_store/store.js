import { configureStore } from '@reduxjs/toolkit';
import rootReducer from '../_reducers/rootReducer';

const store = configureStore({
  reducer: rootReducer,
});

export default store;
