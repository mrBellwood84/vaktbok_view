"use client";

import { IEmployee } from "@/lib/model/IEmployee";
import { employeeSlice } from "@/lib/store/features/employee";
import { useAppDispatch, useAppSelector } from "@/lib/store/hooks";
import {
  Box,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Typography,
} from "@mui/material";

export const EmployeeList = () => {
  const employees = useAppSelector((state) => state.employee.filtered);

  const dispatch = useAppDispatch();

  const selectEmployee = (data: IEmployee) => {
    dispatch(employeeSlice.actions.setSelectedEmployee(data));
  };

  return (
    <Box>
      <List
        dense
        sx={{ maxHeight: "85vh", overflow: "auto", position: "relative" }}
      >
        {employees.map((x) => (
          <ListItem key={x.id}>
            <ListItemButton onClick={() => selectEmployee(x)}>
              <ListItemText
                primary={
                  <Typography sx={{ fontWeight: 500 }}> {x.name} </Typography>
                }
              />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Box>
  );
};
