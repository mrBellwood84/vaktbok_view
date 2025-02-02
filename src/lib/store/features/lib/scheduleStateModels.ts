import { IShift } from "@/lib/model/IShift";

export interface IscheduleItem {
  name: string;
  shifts: IShift[][];
}

export interface IShiftStateModel {
  week: number;
  year: number;
  data: IscheduleItem[];
}
