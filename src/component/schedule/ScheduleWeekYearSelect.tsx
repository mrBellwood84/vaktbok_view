"use client";

import { useAppDispatch, useAppSelector } from "@/lib/store/hooks";
import { useEffect, useRef, useState } from "react";
import { DataLoadbar, DataLoadbarFailed } from "../Loadbar";
import { Box, IconButton, Slider, Typography } from "@mui/material";
import { ArrowLeft, ArrowRight } from "@mui/icons-material";
import {
  getAllWorkday,
  getShiftByWeekYear,
} from "@/lib/db_service/query/db_schedule";
import { scheduleSlice } from "@/lib/store/features/schedule";
import { getNowDateString } from "@/lib/utils/datetimeFunctions";

interface IWeekYear {
  week: number;
  year: number;
}

export const ScheduleWeekYearSelect = () => {
  const dispatch = useAppDispatch();

  const workdays = useAppSelector((s) => s.schedule.allWorkdays);
  const allShiftState = useAppSelector((s) => s.schedule.allShiftsStateModels);
  const stateWeek = useAppSelector((s) => s.schedule.selectedWeek);
  const stateYear = useAppSelector((s) => s.schedule.selectedYear);
  const loading = useAppSelector((s) => s.schedule.workweekLoading);

  const [weekYearData, setWeekYearData] = useState<IWeekYear[]>([]);
  const [wyDataIndex, setWyDataIndex] = useState<number>(-1);

  const disableLeftClick = Boolean(wyDataIndex === 0);
  const disableRightClick = Boolean(wyDataIndex >= weekYearData.length - 1);

  const workdaysLoaded = useRef<boolean>(false);
  const shiftsLoaded = useRef<boolean>(false);

  const createWeekDayData = async () => {
    const data = await getAllWorkday();

    const result: IWeekYear[] = [];
    const dateNow = getNowDateString();
    let index = -1;
    let year = -1;
    let week = -1;

    for (let i = 0; i < data.length; i++) {
      const item = data[i];
      if (item.date === dateNow) index = Math.floor(i / 7);
      if (item.year === year && item.weeknumber === week) continue;

      year = item.year;
      week = item.weeknumber;

      result.push({ week, year });
    }

    setWeekYearData(result);
    setWyDataIndex(index);
    dispatch(scheduleSlice.actions.setAllWorkdays(data));
  };

  const loadCurrentShiftStateModel = async (week: number, year: number) => {
    dispatch(scheduleSlice.actions.setShiftLoading());
    const shifts = await getShiftByWeekYear(week, year);
    dispatch(scheduleSlice.actions.insertShifts({ shifts, week, year }));
  };

  const loadOnInit = async () => {
    if (!workdaysLoaded.current)
      createWeekDayData().finally(() => (workdaysLoaded.current = true));
    if (!shiftsLoaded.current)
      loadCurrentShiftStateModel(stateWeek, stateYear).finally(
        () => (shiftsLoaded.current = true)
      );
  };

  const handleWeekChange = (week: number, year: number) => {
    const shifts = allShiftState.find(
      (x) => x.week === week && x.year === year
    );

    if (shifts) {
      dispatch(scheduleSlice.actions.setShiftLoading());
      dispatch(scheduleSlice.actions.setWeekYear({ shifts, week, year }));
      return;
    }

    loadCurrentShiftStateModel(week, year);
  };

  const handleWeekClick = (n: 1 | -1) => {
    const index = wyDataIndex + n;
    const current = weekYearData[index];
    handleWeekChange(current.week, current.year);
    setWyDataIndex(index);
  };

  const handleSliderChange = (e: Event, v: number | number[]) => {
    const index = v as number;
    const current = weekYearData[index];
    handleWeekChange(current.week, current.year);
    setWyDataIndex(index);
  };

  useEffect(() => {
    loadOnInit();
  });

  if (loading) return <DataLoadbar />;
  if (!loading && workdays.length == 0) return <DataLoadbarFailed />;

  return (
    <Box>
      <Box
        sx={{ display: "flex", justifyContent: "center", alignItems: "center" }}
      >
        <IconButton
          color="secondary"
          disabled={disableLeftClick}
          onClick={() => handleWeekClick(-1)}
        >
          <ArrowLeft />
        </IconButton>
        <Typography
          variant="h5"
          color="secondary"
          sx={{ userSelect: "none", fontWeight: 600 }}
        >
          Uke {stateWeek} | {stateYear}
        </Typography>

        <IconButton
          color="secondary"
          disabled={disableRightClick}
          onClick={() => handleWeekClick(1)}
        >
          <ArrowRight />
        </IconButton>
      </Box>

      <Box>
        <Slider
          size="small"
          min={0}
          max={weekYearData.length - 1}
          step={1}
          value={wyDataIndex}
          defaultValue={wyDataIndex}
          onChange={handleSliderChange}
        />
      </Box>
    </Box>
  );
};
