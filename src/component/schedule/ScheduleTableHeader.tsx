import { scheduleSlice } from "@/lib/store/features/schedule";
import { useAppDispatch, useAppSelector } from "@/lib/store/hooks";
import { Search } from "@mui/icons-material";
import {
  Box,
  InputAdornment,
  TableCell,
  TableHead,
  TableRow,
  TextField,
  Typography,
} from "@mui/material";
import { ChangeEvent } from "react";

interface IDateCellProps {
  dateString: string;
}

const days = [
  "Søndag",
  "Mandag",
  "Tirsdag",
  "Onsdag",
  "Torsdag",
  "Fredag",
  "Lørdag",
];

const months = [
  "Januar",
  "Februar",
  "Mars",
  "April",
  "Mai",
  "Juni",
  "Juli",
  "August",
  "September",
  "Oktober",
  "November",
  "Desember",
];

const HeaderDateCell = ({ dateString }: IDateCellProps) => {
  const date = new Date(dateString);
  const day = days[date.getDay()];
  const month = months[date.getMonth()];

  return (
    <TableCell>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          userSelect: "none",
        }}
      >
        <Typography variant="subtitle2" textAlign="center">
          {day}
        </Typography>
        <Typography variant="caption" textAlign="center">
          {date.getDate()}. {month}
        </Typography>
      </Box>
    </TableCell>
  );
};

const HeaderNameQueryCell = () => {
  const dispatch = useAppDispatch();

  const nameFilter = useAppSelector((s) => s.schedule.nameFilter);

  const handleSearchInput = (e: ChangeEvent<HTMLInputElement>) => {
    const name = e.target.value.toLowerCase();
    dispatch(scheduleSlice.actions.setNameFilter(name));
  };

  return (
    <TableCell sx={{ width: "12.5vw" }}>
      <TextField
        variant="standard"
        size="small"
        placeholder="Søk"
        value={nameFilter}
        onChange={handleSearchInput}
        slotProps={{
          input: {
            startAdornment: (
              <InputAdornment position="start">
                <Search />
              </InputAdornment>
            ),
          },
        }}
      />
    </TableCell>
  );
};

export const ScheduleTableHeader = () => {
  const week = useAppSelector((s) => s.schedule.selectedWeek);
  const year = useAppSelector((s) => s.schedule.selectedYear);
  const dates = useAppSelector((s) => s.schedule.allWorkdays).filter(
    (x) => x.year === year && x.weeknumber === week
  );

  return (
    <TableHead>
      <TableRow>
        <HeaderNameQueryCell />
        {dates &&
          dates.map((x) => <HeaderDateCell key={x.id} dateString={x.date} />)}
      </TableRow>
    </TableHead>
  );
};
