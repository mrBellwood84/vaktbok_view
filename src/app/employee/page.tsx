"use client";

import { EmployeeList } from "@/component/employee/EmployeeList";
import { EmployeeMainCard } from "@/component/employee/EmployeeMainCard";
import { DataLoadbar, DataLoadbarFailed } from "@/component/Loadbar";
import { getAllEmployee } from "@/lib/db_service/db_employee";
import { employeeSlice } from "@/lib/store/features/employee";
import { useAppDispatch, useAppSelector } from "@/lib/store/hooks";
import { Grid2 } from "@mui/material";
import { useEffect, useRef } from "react";

const Page = () => {
  const dbCalled = useAppSelector((state) => state.employee.dbCalled);
  const loadSuccess = useAppSelector((state) => state.employee.loadSuccess);
  const apiCalled = useRef<boolean>(false);

  const dispatch = useAppDispatch();

  useEffect(() => {
    if (!apiCalled.current) {
      getAllEmployee()
        .then((data) => {
          dispatch(employeeSlice.actions.setAllEmployees(data));
        })
        .finally(() => {
          dispatch(employeeSlice.actions.setDbCalled());
          apiCalled.current = true;
        });
    }
  });

  if (!dbCalled) return <DataLoadbar />;
  if (!loadSuccess) return <DataLoadbarFailed />;
  return (
    <Grid2 container spacing={2}>
      <Grid2 size={3}>Search field here</Grid2>
      <Grid2 size={9}>Display employe menu here</Grid2>
      <Grid2 size={3}>
        <EmployeeList />
      </Grid2>
      <Grid2 size={9}>
        <EmployeeMainCard />
      </Grid2>
    </Grid2>
  );
};

export default Page;
