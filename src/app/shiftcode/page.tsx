"use client";

import { getShiftCodes } from "@/lib/db_service/db_shitfcode";
import { shiftcodeSlice } from "@/lib/store/features/shiftcode";
import { useAppDispatch, useAppSelector } from "@/lib/store/hooks";
import { useEffect, useRef } from "react";

const Page = () => {
  const shifcodeData = useAppSelector((state) => state.shiftcode.allData);
  const shiftcodeDataExist = useAppSelector(
    (state) => state.shiftcode.dataLoaded
  );

  const apiCalled = useRef<boolean>(false);

  const dispatch = useAppDispatch();

  useEffect(() => {
    if (!apiCalled.current) {
      getShiftCodes().then((data) => {
        dispatch(shiftcodeSlice.actions.setAllShiftCodes(data));
        apiCalled.current = true;
      });
    }
  });

  if (!shiftcodeDataExist) return <div>no shiftcode data loaded</div>;
  return <div>Shiftcode data loaded</div>;
};

export default Page;
