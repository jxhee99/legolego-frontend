import { combineReducers } from 'redux';
import diyReducer from '../_slices/diySlice';

const rootReducer = combineReducers({
  diyCreate: diyReducer,
});

export default rootReducer;
