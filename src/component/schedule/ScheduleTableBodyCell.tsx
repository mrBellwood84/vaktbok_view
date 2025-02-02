import { IShift } from "@/lib/model/IShift";
import {
  Box,
  Button,
  ListItemText,
  Menu,
  MenuItem,
  MenuList,
  TableCell,
  Typography,
} from "@mui/material";
import { MouseEvent, useState } from "react";

interface IBodyCellProps {
  shifts: IShift[];
}

interface ICellListItemProps {
  shift: IShift;
}

const CellListItem = ({ shift }: ICellListItemProps) => {
  const { code, start, end, timestamp } = shift;

  return (
    <MenuItem>
      <ListItemText
        primary={
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <Typography sx={{ fontWeight: 600 }}>{code}</Typography>
            <Typography>
              {start} - {end}
            </Typography>
          </Box>
        }
        secondary={
          <Typography variant="caption" color="info" fontStyle="italic">
            {timestamp.toLocaleString()}
          </Typography>
        }
      />
    </MenuItem>
  );
};

export const ScheduleTableBodyCell = ({ shifts }: IBodyCellProps) => {
  const [anchor, setAnchor] = useState<HTMLElement | null>(null);
  const open = Boolean(anchor);

  const handleClick = (e: MouseEvent<HTMLButtonElement>) =>
    setAnchor(e.currentTarget);
  const hanldeClose = () => setAnchor(null);

  return (
    <TableCell align="center">
      <Button
        variant={shifts.length > 1 ? "outlined" : "text"}
        color={shifts.length > 1 ? "error" : "secondary"}
        onClick={handleClick}
      >
        <Box sx={{ display: "flex", flexDirection: "column" }}>
          <Typography variant="subtitle2">{shifts[0].code}</Typography>
          <Typography variant="caption">
            {shifts[0].start} - {shifts[0].end}
          </Typography>
        </Box>
      </Button>
      <Menu open={open} onClose={hanldeClose} anchorEl={anchor}>
        <MenuList disablePadding disableListWrap>
          {shifts.map((item) => (
            <CellListItem key={item.timestamp as string} shift={item} />
          ))}
        </MenuList>
      </Menu>
    </TableCell>
  );
};
