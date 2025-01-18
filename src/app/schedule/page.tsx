"use client";

import { DataLoadbar, DataLoadbarFailed } from "@/component/Loadbar";
import { ScheduleTable } from "@/component/schedule/ScheduleTable";
import { YearWeekSelect } from "@/component/schedule/WeekYearSelect";
import { getAllWorkday } from "@/lib/db_service/query/db_schedule";
import { scheduleSlice } from "@/lib/store/features/schedule";
import { useAppDispatch, useAppSelector } from "@/lib/store/hooks";
import { Box } from "@mui/material";
import { useEffect, useRef } from "react";

const Page = () => {
  const dbWorkweekCalled = useAppSelector(
    (state) => state.schedule.dbWorkweekCalled
  );
  const dbWorkweekSuccess = useAppSelector(
    (state) => state.schedule.dbWorkweekSuccess
  );
  const apiCalled = useRef<boolean>(false);

  const dispatch = useAppDispatch();

  const loadScheduleData = async () => {
    const workdayData = await getAllWorkday();
    dispatch(scheduleSlice.actions.setAllWorkdays(workdayData));
    dispatch(scheduleSlice.actions.setDbWookweekSuccess());
  };

  useEffect(() => {
    if (!apiCalled.current) {
      loadScheduleData().finally(() => {
        dispatch(scheduleSlice.actions.setDbWorkweekCalled());
        apiCalled.current = true;
      });
    }
  });

  if (!dbWorkweekCalled) return <DataLoadbar />;
  if (!dbWorkweekSuccess) return <DataLoadbarFailed />;
  return (
    <Box>
      <YearWeekSelect />
      <ScheduleTable />
    </Box>
  );
};

export default Page;
