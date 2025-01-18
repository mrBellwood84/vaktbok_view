import { IShift } from "@/lib/model/IShift";
import { IWorkday } from "@/lib/model/IWorkday";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface IScheduleState {
  allWorkdays: IWorkday[];
  shifts: IShift[];

  selectedYear: number;
  selectedWeekN: number;

  dbWorkweekCalled: boolean;
  dbWorkweekSuccess: boolean;

  dbShiftCalled: boolean;
  dbShiftSuccess: boolean;
}

const initialState: IScheduleState = {
  allWorkdays: [],
  shifts: [],

  selectedYear: 0,
  selectedWeekN: 0,

  dbWorkweekCalled: false,
  dbWorkweekSuccess: false,

  dbShiftCalled: false,
  dbShiftSuccess: false,
};

export const scheduleSlice = createSlice({
  name: "schedule",
  initialState,
  reducers: {
    setAllWorkdays: (state, action: PayloadAction<IWorkday[]>) => {
      state.allWorkdays = action.payload.sort((a, b) => {
        if (a.date < b.date) return -1;
        return 1;
      });
    },
    setAllShifts: (state, action: PayloadAction<IShift[]>) => {
      state.shifts = action.payload.sort((a, b) => {
        if (a.name < b.name) return -1;
        return 1;
      });
    },

    setSelectedWeekYear: (
      state,
      action: PayloadAction<{ year: number; weekN: number }>
    ) => {
      state.selectedYear = action.payload.year;
      state.selectedWeekN = action.payload.weekN;
    },

    setDbWorkweekCalled: (state) => {
      state.dbWorkweekCalled = true;
    },
    setDbWookweekSuccess: (state) => {
      state.dbWorkweekSuccess = true;
    },

    reloadDbShift: (state) => {
      state.dbShiftCalled = false;
      state.dbShiftSuccess = false;
    },
    setDbShiftCalled: (state) => {
      state.dbShiftCalled = true;
    },
    setDbShiftSuccess: (state) => {
      state.dbShiftSuccess = true;
    },
  },
});
