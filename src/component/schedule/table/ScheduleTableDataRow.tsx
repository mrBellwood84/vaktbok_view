import { IShift } from "@/lib/model/IShift";
import { TableCell, TableRow } from "@mui/material";
import { ScheduleTableDataCell } from "./ScheduleTableDataCell";

interface IProps {
  name: string;
  data: IShift[];
}

export const ScheduleTableDataRow = ({ name, data }: IProps) => {
  const index = [...new Array(7).keys()];

  return (
    <TableRow sx={{ userSelect: "none" }}>
      <TableCell sx={{ fontWeight: 600 }}>{name}</TableCell>
      {index.map((i) => (
        <ScheduleTableDataCell
          key={`${name}-${i}`}
          shifts={data.filter((x) => x.day === i)}
        />
      ))}
    </TableRow>
  );
};
