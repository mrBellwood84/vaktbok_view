import { configureStore } from "@reduxjs/toolkit";

import { shiftcodeSlice } from "./features/shiftcode";
import { employeeSlice } from "./features/employee";
import { scheduleSlice } from "./features/schedule";

export const makeStore = () => {
  return configureStore({
    reducer: {
      employee: employeeSlice.reducer,
      schedule: scheduleSlice.reducer,
      shiftcode: shiftcodeSlice.reducer,
    },
  });
};

// Infer the type of makeStore
export type AppStore = ReturnType<typeof makeStore>;
// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<AppStore["getState"]>;
export type AppDispatch = AppStore["dispatch"];
