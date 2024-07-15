import { combineReducers } from 'redux';
import diyReducer from '../_slices/diySlice';
import searchReducer from '../_slices/searchDiySlice';
import wishlistReducer from '../_slices/wishlistSlice';

const rootReducer = combineReducers({
  diyCreate: diyReducer,
  search: searchReducer,
  wishlist: wishlistReducer,
});

export default rootReducer;
