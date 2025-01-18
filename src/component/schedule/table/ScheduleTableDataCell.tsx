import { IShift } from "@/lib/model/IShift";
import { Box, TableCell, Typography } from "@mui/material";

interface ICellProps {
  shifts: IShift[];
}

export const ScheduleTableDataCell = ({ shifts }: ICellProps) => {
  return (
    <TableCell align="center">
      <Box>
        <Typography variant="subtitle2">{shifts[0].code}</Typography>
        <Typography variant="caption">
          {shifts[0].start} - {shifts[0].end}
        </Typography>
      </Box>
    </TableCell>
  );
};
