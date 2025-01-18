"use client";

import { DataLoadbar, DataLoadbarFailed } from "@/component/Loadbar";
import { ShiftCodeTable } from "@/component/shiftcode/ShiftcodeTable";
import { getShiftCodes } from "@/lib/db_service/query/db_shitfcode";
import { shiftcodeSlice } from "@/lib/store/features/shiftcode";
import { useAppDispatch, useAppSelector } from "@/lib/store/hooks";
import { Box } from "@mui/material";
import { useEffect, useRef } from "react";

const Page = () => {
  const data = useAppSelector((state) => state.shiftcode.allData);
  const dbCalled = useAppSelector((state) => state.shiftcode.dbCalled);
  const loadSuccess = useAppSelector((state) => state.shiftcode.loadSuccess);
  const apiCalled = useRef<boolean>(false);

  const dispatch = useAppDispatch();

  useEffect(() => {
    if (!apiCalled.current) {
      getShiftCodes()
        .then((data) => {
          dispatch(shiftcodeSlice.actions.setAllShiftCodes(data));
          dispatch(shiftcodeSlice.actions.setLoadSuccess(true));
        })
        .finally(() => {
          dispatch(shiftcodeSlice.actions.setDbCalled());
          apiCalled.current = true;
        });
    }
  });

  if (!dbCalled) return <DataLoadbar />;
  if (!loadSuccess) return <DataLoadbarFailed />;
  return (
    <Box display="flex" justifyContent="center">
      <ShiftCodeTable data={data} />
    </Box>
  );
};

export default Page;
