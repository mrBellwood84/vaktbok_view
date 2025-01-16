"use client";

import { DataLoadbar, DataLoadbarFailed } from "@/component/Loadbar";
import { getShiftCodes } from "@/lib/db_service/db_shitfcode";
import { shiftcodeSlice } from "@/lib/store/features/shiftcode";
import { useAppDispatch, useAppSelector } from "@/lib/store/hooks";
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
        })
        .finally(() => {
          dispatch(shiftcodeSlice.actions.setDbCalled());
          apiCalled.current = true;
        });
    }
  });

  if (!dbCalled) return <DataLoadbar />;
  if (!loadSuccess) return <DataLoadbarFailed />;
  return <div>load complete</div>;
};

export default Page;
