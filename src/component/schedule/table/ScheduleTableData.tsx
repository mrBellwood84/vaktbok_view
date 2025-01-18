import { useAppSelector } from "@/lib/store/hooks";
import {
  Box,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import { Fragment } from "react";
import { ScheduleTableDataRow } from "./ScheduleTableDataRow";

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

  const names = new Set([...shifts.map((x) => x.name)]).values().toArray();

  return (
    <Fragment>
      <TableHead>
        <TableRow>
          <TableCell />
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
            name={n}
            data={shifts.filter((s) => s.name === n)}
          />
        ))}
      </TableBody>
    </Fragment>
  );
};
