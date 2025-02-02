import { ScheduleTable } from "@/component/schedule/ScheduleTable";
import { ScheduleWeekYearSelect } from "@/component/schedule/ScheduleWeekYearSelect";
import { Box } from "@mui/material";

const Page = () => {
  return (
    <Box>
      <ScheduleWeekYearSelect />
      <ScheduleTable />
    </Box>
  );
};

export default Page;
