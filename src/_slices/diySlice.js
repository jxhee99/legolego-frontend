import { createSlice } from '@reduxjs/toolkit';

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
  detailCourses: [],
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
      const { startDate, endDate } = action.payload;
      state.route = {
        startDate,
        lastDate: endDate,
      };
    },
    updatePackageForm(state, action) {
      state.packageForm = { ...state.packageForm, ...action.payload };
    },
    updateUserNum(state, action) {
      state.userNum = action.payload;
    },
    addCourse(state, action) {
      state.detailCourses.push(action.payload);
    },
  },
});

export const {
  updateAirline,
  updateRoute,
  updateDetailCourses,
  updatePackageForm,
  updateUserNum,
  addCourse,
} = diySlice.actions;

export const selectAirline = (state) => state.diyCreate.airline;
export const selectRoute = (state) => state.diyCreate.route;
export const selectDetailCourses = (state) => state.diyCreate.detailCourses;

export default diySlice.reducer;
