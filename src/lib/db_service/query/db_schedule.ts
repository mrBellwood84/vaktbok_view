"use server";

import { IWorkday } from "@/lib/model/IWorkday";
import { dbBaseQuery } from "./db_root";

const SELECT_WORKDAYS = "SELECT * FROM workday";

export const getAllWorkday = async () => {
  const data = (await dbBaseQuery(SELECT_WORKDAYS)) as IWorkday[];
  return data;
};
