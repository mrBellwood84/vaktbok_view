import { IWorkday } from "@/lib/model/IWorkday";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IscheduleItem, IShiftStateModel } from "./lib/scheduleStateModels";
import { getCurrentWeek, getCurrentYear } from "@/lib/utils/datetimeFunctions";
import { IShift } from "@/lib/model/IShift";
import {
  createShiftStateModel,
  setFilteredShiftsByName,
} from "./lib/scheduleStateFunctions";

interface IScheduleState {
  allWorkdays: IWorkday[];

  allShiftsStateModels: IShiftStateModel[];
  currentShiftStateModels?: IShiftStateModel;
  filteredSceduleItem: IscheduleItem[];

  nameFilter: string;
  selectedYear: number;
  selectedWeek: number;

  workweekLoading: boolean;
  shiftLoading: boolean;
}

const initialState: IScheduleState = {
  allWorkdays: [],

  allShiftsStateModels: [],
  filteredSceduleItem: [],

  nameFilter: "",
  selectedYear: getCurrentYear(),
  selectedWeek: getCurrentWeek(),

  workweekLoading: true,
  shiftLoading: true,
};

export const scheduleSlice = createSlice({
  name: "schedule",
  initialState,
  reducers: {
    setAllWorkdays: (state, action: PayloadAction<IWorkday[]>) => {
      state.allWorkdays = action.payload;
      state.workweekLoading = false;
    },

    insertShifts: (
      state,
      action: PayloadAction<{ shifts: IShift[]; week: number; year: number }>
    ) => {
      const { shifts, week, year } = action.payload;
      const all = [...state.allShiftsStateModels];
      const shiftModel = createShiftStateModel(shifts, week, year);

      all.push(shiftModel);

      state.allShiftsStateModels = all;
      state.currentShiftStateModels = shiftModel;
      state.filteredSceduleItem = setFilteredShiftsByName(shiftModel);
      state.selectedWeek = week;
      state.selectedYear = year;
      state.shiftLoading = false;
    },

    setWeekYear: (
      state,
      action: PayloadAction<{ week: number; year: number }>
    ) => {
      const { week, year } = action.payload;
      state.selectedWeek = week;
      state.selectedYear = year;
    },

    setNameFilter: (state, action: PayloadAction<string>) => {
      const name = action.payload;
      state.nameFilter = name;
    },

    setShiftLoading: (state) => {
      state.shiftLoading = true;
    },
  },
});
