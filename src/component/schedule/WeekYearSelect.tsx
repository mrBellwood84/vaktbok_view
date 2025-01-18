"use client";

import { scheduleSlice } from "@/lib/store/features/schedule";
import { useAppDispatch, useAppSelector } from "@/lib/store/hooks";
import { getNowDateString } from "@/lib/utils/datetimeFunctions";
import { ArrowLeft, ArrowRight } from "@mui/icons-material";
import { Box, IconButton, Slider, Typography } from "@mui/material";
import { useEffect, useRef, useState } from "react";

interface IWeekYear {
  week: number;
  year: number;
}

export const YearWeekSelect = () => {
  const allWorkdays = useAppSelector((state) => state.schedule.allWorkdays);
  const year = useAppSelector((state) => state.schedule.selectedYear);
  const weekN = useAppSelector((state) => state.schedule.selectedWeekN);

  const [weeksYears, setWeeksYears] = useState<IWeekYear[]>([]);
  const [wyIndex, setWyIndex] = useState<number>(0);
  const selectorHasInitialized = useRef<boolean>(false);

  const dispatch = useAppDispatch();

  const initSelector = () => {
    let lastWeek = allWorkdays[0].weeknumber;
    let lastYear = 0;
    const dateNow = getNowDateString();

    const result: IWeekYear[] = [];

    for (let i = 0; i < allWorkdays.length; i++) {
      const x = allWorkdays[i];

      // set year if chage
      if (lastYear < x.year) {
        lastYear = x.year;
        lastWeek = 0;
      }

      // create new item on fresh week number
      if (lastWeek < x.weeknumber) {
        const item: IWeekYear = { week: x.weeknumber, year: x.year };
        result.push(item);
        lastWeek = x.weeknumber;
      }

      // set start year and weeknumber on
      if (x.date === dateNow) {
        setWorkweekSchedule(x.weeknumber, x.year);
        setWyIndex(result.length - 1);
        dispatch(
          scheduleSlice.actions.setSelectedWeekYear({
            weekN: x.weeknumber,
            year: x.year,
          })
        );
      }
    }

    setWeeksYears(result);
    selectorHasInitialized.current = true;
  };

  const handleWeekClick = (next: 1 | -1) => {
    const index = wyIndex + next;
    if (index < 0) return;
    if (index >= weeksYears.length) return;

    const current = weeksYears[index];

    setWorkweekSchedule(current.week, current.year);

    setWyIndex(index);
    dispatch(
      scheduleSlice.actions.setSelectedWeekYear({
        weekN: current.week,
        year: current.year,
      })
    );
  };

  const handeSliderChange = (e: Event, value: number | number[]) => {
    const index = value as number;
    const current = weeksYears[index];

    setWorkweekSchedule(current.week, current.year);

    setWyIndex(index);
    dispatch(
      scheduleSlice.actions.setSelectedWeekYear({
        weekN: current.week,
        year: current.year,
      })
    );
  };

  const setWorkweekSchedule = (weekN: number, year: number) => {
    console.log("DEV :: load workweek data not implemented", weekN, year);
  };

  useEffect(() => {
    if (!selectorHasInitialized.current) initSelector();
  });

  return (
    <Box>
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <IconButton
          color="secondary"
          onClick={() => handleWeekClick(-1)}
          disabled={wyIndex <= 0}
        >
          <ArrowLeft />
        </IconButton>
        <Typography variant="h5" color="secondary" sx={{ userSelect: "none" }}>
          Uke {weekN}, {year}
        </Typography>
        <IconButton
          color="secondary"
          onClick={() => handleWeekClick(1)}
          disabled={wyIndex >= weeksYears.length - 1}
        >
          <ArrowRight />
        </IconButton>
      </Box>

      <Box>
        <Slider
          size="small"
          min={0}
          max={weeksYears.length - 1}
          step={1}
          value={wyIndex}
          defaultValue={wyIndex}
          onChange={handeSliderChange}
        />
      </Box>
    </Box>
  );
};
