import { IShiftCode } from "@/lib/model/IShiftCode";
import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";

interface IProps {
  data: IShiftCode[];
}

export const ShiftCodeTable = ({ data }: IProps) => {
  return (
    <TableContainer component={Paper} sx={{ width: "max-content" }}>
      <Table size="small" stickyHeader>
        <TableHead>
          <TableRow>
            <TableCell align="right">Kode</TableCell>
            <TableCell align="center">Start</TableCell>
            <TableCell align="center">Slutt</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {data.map((d) => (
            <TableRow key={d.id}>
              <TableCell align="right">{d.code}</TableCell>
              <TableCell align="center">{d.start}</TableCell>
              <TableCell align="center">{d.end}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};
