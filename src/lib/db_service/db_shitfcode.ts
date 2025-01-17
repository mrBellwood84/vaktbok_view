"use server";

import { IShiftCode } from "../model/IShiftCode";
import { dbBaseQuery } from "./db_root";

// Query strings
const SELECT_ALL_SHIFTCODE = 'SELECT * FROM shiftcode WHERE CODE != ""';

// Query functions
export const getShiftCodes = async () => {
  const data = (await dbBaseQuery(SELECT_ALL_SHIFTCODE)) as IShiftCode[];
  return data;
};
