"use client";

import { useAppSelector } from "@/lib/store/hooks";
import {
  Skeleton,
  TableBody,
  TableCell,
  TableRow,
  Typography,
} from "@mui/material";
import { ScheduleTableBodyCell } from "./ScheduleTableBodyCell";

const BodyLoading = () => {
  const rows = [...Array(10).keys()];
  const cells = [...Array(8).keys()];

  return (
    <TableBody>
      {rows.map((x) => (
        <TableRow key={x}>
          {cells.map((y) => (
            <TableCell key={`${x}${y}`}>
              <Skeleton variant="rounded" height={30} />
            </TableCell>
          ))}
        </TableRow>
      ))}
    </TableBody>
  );
};

export const ScheduleTableBody = () => {
  const items = useAppSelector((s) => s.schedule.filteredSceduleItem);

  const loading = useAppSelector((s) => s.schedule.shiftLoading);

  if (loading) return <BodyLoading />;

  return (
    <TableBody>
      {items.map((x, i) => (
        <TableRow key={`row-${i}`} hover>
          <TableCell>
            <Typography variant="subtitle2">{x.name}</Typography>
          </TableCell>
          {x.shifts.map((y, j) => (
            <ScheduleTableBodyCell key={`row-${i}-cell${j}`} shifts={y} />
          ))}
        </TableRow>
      ))}
    </TableBody>
  );
};
