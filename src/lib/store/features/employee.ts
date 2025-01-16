import { IEmployee } from "@/lib/model/IEmployee";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface IEmployeeState {
  data: IEmployee[];
  filtered: IEmployee[];
  selected?: IEmployee;
  dbCalled: boolean;
  loadSuccess: boolean;
}

const initialState: IEmployeeState = {
  data: [],
  filtered: [],
  dbCalled: false,
  loadSuccess: false,
};

export const employeeSlice = createSlice({
  name: "employee",
  initialState,
  reducers: {
    setDbCalled: (state) => {
      state.dbCalled = true;
    },
    setAllEmployees: (state, action: PayloadAction<IEmployee[]>) => {
      state.data = action.payload.sort((a, b) => {
        if (a.name < b.name) return -1;
        return 1;
      });
      state.filtered = state.data;
      state.loadSuccess = true;
    },
    setSelectedEmployee: (state, action: PayloadAction<IEmployee>) => {
      state.selected = action.payload;
      console.log(state.selected);
    },
  },
});
