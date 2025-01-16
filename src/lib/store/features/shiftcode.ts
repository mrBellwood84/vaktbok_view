import { IShiftCode } from "@/lib/model/IShiftCode";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface IShiftCodeState {
  allData: IShiftCode[];
  dbCalled: boolean;
  loadSuccess: boolean;
}

const initialState: IShiftCodeState = {
  allData: [],
  dbCalled: false,
  loadSuccess: false,
};

export const shiftcodeSlice = createSlice({
  name: "shiftcode",
  initialState,
  reducers: {
    setDbCalled: (state) => {
      state.dbCalled = true;
    },
    setAllShiftCodes: (state, action: PayloadAction<IShiftCode[]>) => {
      state.allData = action.payload.sort((a, b) => {
        if (a.start < b.start) return -1;
        return 1;
      });
      state.loadSuccess = true;
    },
  },
});
