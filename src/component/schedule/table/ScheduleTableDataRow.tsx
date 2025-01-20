import { IShift } from "@/lib/model/IShift";
import { TableCell, TableRow } from "@mui/material";
import { ScheduleTableDataCell } from "./ScheduleTableDataCell";

interface IProps {
  data: IShift[];
}

export const ScheduleTableDataRow = ({ data }: IProps) => {
  const index = [...new Array(7).keys()];

  return (
    <TableRow sx={{ userSelect: "none" }} hover>
      <TableCell sx={{ fontWeight: 600 }}>{data[0].name}</TableCell>
      {index.map((i) => (
        <ScheduleTableDataCell
          key={`${name}-${i}`}
          shifts={data.filter((x) => x.day === i)}
        />
      ))}
    </TableRow>
  );
};
