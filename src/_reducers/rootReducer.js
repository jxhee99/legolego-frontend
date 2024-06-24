import { combineReducers } from 'redux';
import diyReducer from '../_slices/diySlice';
import authReducer from '../_slices/authSlice';

const rootReducer = combineReducers({
  diyCreate: diyReducer,
  auth: authReducer,
});

export default rootReducer;
