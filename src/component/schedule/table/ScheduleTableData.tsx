import { useAppSelector } from "@/lib/store/hooks";
import {
  Box,
  InputAdornment,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  TextField,
  Typography,
} from "@mui/material";
import { BaseSyntheticEvent, Fragment, useState } from "react";
import { ScheduleTableDataRow } from "./ScheduleTableDataRow";
import { Search } from "@mui/icons-material";

interface IDateboxProps {
  dateStr: string;
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

const Datebox = ({ dateStr }: IDateboxProps) => {
  const dateObj = new Date(dateStr);
  const date = dateObj.getDate();
  const dayIndex = dateObj.getDay();
  const monthIndex = dateObj.getMonth();

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        userSelect: "none",
      }}
    >
      <Typography variant="subtitle2" textAlign="center">
        {days[dayIndex]}
      </Typography>
      <Typography variant="caption" textAlign="center">
        {date}. {months[monthIndex]}
      </Typography>
    </Box>
  );
};

export const ScheduleTableData = () => {
  const selectedWeek = useAppSelector((x) => x.schedule.selectedWeekN);
  const selectedYear = useAppSelector((x) => x.schedule.selectedYear);

  const dates = useAppSelector((state) => state.schedule.allWorkdays).filter(
    (x) => x.year === selectedYear && x.weeknumber === selectedWeek
  );

  const shifts = useAppSelector((s) => s.schedule.shifts);

  const allNames = new Set([...shifts.map((x) => x.name)]).values().toArray();

  const [names, setNames] = useState<string[]>(allNames);

  const handleSearchInput = (e: BaseSyntheticEvent) => {
    const value = (e.target.value as string).toLocaleLowerCase();

    if (value.length === 0) {
      setNames(allNames);
      return;
    }

    const result = allNames.filter((n) => {
      const normed = n.toLowerCase();
      if (normed.includes(value)) return n;
    });

    setNames(result);
  };

  return (
    <Fragment>
      <TableHead>
        <TableRow>
          <TableCell>
            <TextField
              variant="standard"
              placeholder="Søk navn"
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
          {dates.map((x) => (
            <TableCell key={x.id} width="12.5%">
              <Datebox dateStr={x.date} />
            </TableCell>
          ))}
        </TableRow>
      </TableHead>
      <TableBody>
        {names.map((n) => (
          <ScheduleTableDataRow
            key={n}
            data={shifts.filter((s) => s.name === n)}
          />
        ))}
      </TableBody>
    </Fragment>
  );
};
