import { IShiftCode } from "@/lib/model/IShiftCode";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface IShiftCodeState {
  allData: IShiftCode[];
  dataLoaded: boolean;
}

const initialState: IShiftCodeState = {
  allData: [],
  dataLoaded: false,
};

export const shiftcodeSlice = createSlice({
  name: "shiftcode",
  initialState,
  reducers: {
    setAllShiftCodes: (state, action: PayloadAction<IShiftCode[]>) => {
      state.allData = action.payload.sort((a, b) => {
        if (a.start < b.start) return -1;
        return 1;
      });
      state.dataLoaded = true;
    },
  },
});
