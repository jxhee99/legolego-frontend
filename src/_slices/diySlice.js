import { createSlice, createSelector } from '@reduxjs/toolkit';

const initialState = {
  airline: {
    startAirlineName: '',
    startingPoint: '',
    destination: '',
    startFlightNum: '',
    boardingDate: '',
    comeAirlineName: '',
    comeFlightNum: '',
    comingDate: '',
  },
  route: {
    startDate: '',
    lastDate: '',
  },
  detailCourses: [
    {
      dayNum: '2024-06-12',
      courses: [],
      fileUrl: '',
    },
    {
      dayNum: '2024-06-13',
      courses: [],
      fileUrl: '',
    },
  ],
  packageForm: {},
  userNum: 0,
};

const diySlice = createSlice({
  name: 'diyCreate',
  initialState,
  reducers: {
    updateAirline(state, action) {
      state.airline = { ...state.airline, ...action.payload };
    },
    updateRoute(state, action) {
      state.route = { ...state.route, ...action.payload };
    },
    updateDetailCourses(state, action) {
      state.detailCourses = action.payload;
    },
    updatePackageForm(state, action) {
      state.packageForm = { ...state.packageForm, ...action.payload };
    },
    updateUserNum(state, action) {
      state.userNum = action.payload;
    },
  },
});

export const {
  updateAirline,
  updateRoute,
  updateDetailCourses,
  updatePackageForm,
  updateUserNum,
} = diySlice.actions;

export const selectDetailCourses = (state) => {
  return state.diyCreate.detailCourses;
};

export default diySlice.reducer;
