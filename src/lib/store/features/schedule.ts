import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface IScheduleState {
  dataLoaded: boolean;
}

const initialState: IScheduleState = {
  dataLoaded: false,
};

export const scheduleSlice = createSlice({
  name: "schedule",
  initialState,
  reducers: {
    setAllSchedule: (state, action: PayloadAction<null>) => {
      state.dataLoaded = true;
    },
  },
});
