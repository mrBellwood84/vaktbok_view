"use client";

import { Paper, Table, TableContainer } from "@mui/material";
import { ScheduleTableHeader } from "./ScheduleTableHeader";
import { ScheduleTableBody } from "./ScheduleTableBody";
import { useAppSelector } from "@/lib/store/hooks";

export const ScheduleTable = () => {
  const loading = useAppSelector((s) => s.schedule.workweekLoading);
  if (loading) return null;

  return (
    <TableContainer component={Paper}>
      <Table>
        <ScheduleTableHeader />
        <ScheduleTableBody />
      </Table>
    </TableContainer>
  );
};
