import { Table, TableContainer } from "@mui/material";
import { ScheduleTableLoading } from "./table/ScheduleTableLoading";
import { ScheduleTableData } from "./table/ScheduleTableData";
import { useAppSelector } from "@/lib/store/hooks";

export const ScheduleTable = () => {
  const dbShiftCalled = useAppSelector((s) => s.schedule.dbShiftCalled);
  const dbShiftSuccess = useAppSelector((s) => s.schedule.dbShiftSuccess);

  return (
    <TableContainer sx={{ mt: 2, mb: 2, maxHeight: "84vh" }}>
      <Table stickyHeader>
        {!dbShiftCalled && !dbShiftSuccess && <ScheduleTableLoading />}
        {dbShiftCalled && dbShiftSuccess && <ScheduleTableData />}
      </Table>
    </TableContainer>
  );
};
