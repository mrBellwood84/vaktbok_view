"use client";

import { DataLoadbar, DataLoadbarFailed } from "@/component/Loadbar";
import { getAllEmployee } from "@/lib/db_service/db_employee";
import { employeeSlice } from "@/lib/store/features/employee";
import { useAppDispatch, useAppSelector } from "@/lib/store/hooks";
import { useEffect, useRef } from "react";

const Page = () => {
  const data = useAppSelector((state) => state.employee.data);
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
  return <div>Load complete</div>;
};

export default Page;
