"use server";

import { IWorkday } from "@/lib/model/IWorkday";
import { dbBaseQuery } from "./db_root";
import { IShift } from "@/lib/model/IShift";

const SELECT_WORKDAYS = "SELECT * FROM workday";
const SELECT_SHIFTS =
  "SELECT e.name as name, w.weekday as day, sc.code as code, sc.start as start, sc.end as end, s.timestamp as timestamp  FROM shift AS s JOIN employee AS e ON e.id = s.employee_id JOIN workday AS w ON w.id = s.workday_id JOIN shiftcode AS sc on sc.id = s.shiftcode_id WHERE w.weeknumber = ? and w.year = ?";

export const getAllWorkday = async () => {
  const data = (await dbBaseQuery(SELECT_WORKDAYS)) as IWorkday[];
  return data;
};

export const getShiftByWeekYear = async (weekN: number, year: number) => {
  const data = (await dbBaseQuery(SELECT_SHIFTS, [weekN, year])) as IShift[];
  return data;
};
