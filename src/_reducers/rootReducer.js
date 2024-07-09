import { combineReducers } from 'redux';
import diyReducer from '../_slices/diySlice';
import searchReducer from '../_slices/searchDiySlice';

const rootReducer = combineReducers({
  diyCreate: diyReducer,
  search: searchReducer,
});

export default rootReducer;
