import { IEmployee } from "../model/IEmployee";
import { dbBaseQuery } from "./db.root";

const SELECT_ALL_EMPLOYEE = "SELECT * FROM employee";

export const getAllEmployee = async () => {
  const data = (await dbBaseQuery(SELECT_ALL_EMPLOYEE)) as IEmployee[];
  return data;
};
