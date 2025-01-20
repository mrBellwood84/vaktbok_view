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
import { useState } from "react";

interface ICellProps {
  shifts: IShift[];
}

interface IShiftMenuProps {
  shift: IShift;
}

const ShiftMenuListItem = ({ shift }: IShiftMenuProps) => {
  return (
    <MenuItem>
      <ListItemText
        primary={
          <Box sx={{ display: "flex", flexDirection: "column" }}>
            <Typography variant="body1">{shift.code}</Typography>
            <Typography variant="body2">
              {shift.start} - {shift.end}
            </Typography>
            <Typography
              variant="caption"
              sx={{
                fontSize: 12,
                fontStyle: "italic",
                color: "gray",
              }}
            >
              {shift.timestamp as string}
            </Typography>
          </Box>
        }
      />
    </MenuItem>
  );
};

export const ScheduleTableDataCell = ({ shifts }: ICellProps) => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(e.currentTarget);
  };

  const handleClose = () => setAnchorEl(null);

  shifts.sort((a, b) => {
    if (a.timestamp > b.timestamp) return -1;
    return 1;
  });

  return (
    <TableCell align="center">
      <Button
        variant={shifts.length > 1 ? "outlined" : "text"}
        onClick={handleClick}
        color={shifts.length > 1 ? "error" : "secondary"}
      >
        <Box display="flex" flexDirection="column">
          <Typography variant="subtitle2">{shifts[0].code}</Typography>
          <Typography variant="caption">
            {shifts[0].start} - {shifts[0].end}{" "}
          </Typography>
        </Box>
      </Button>
      <Menu open={open} onClose={handleClose} anchorEl={anchorEl}>
        <MenuList disablePadding disableListWrap>
          {shifts.map((s) => (
            <ShiftMenuListItem key={`${s.name}-${s.timestamp}`} shift={s} />
          ))}
        </MenuList>
      </Menu>
    </TableCell>
  );
};
