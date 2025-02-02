import { IShift } from "@/lib/model/IShift";
import { IscheduleItem, IShiftStateModel } from "./scheduleStateModels";

export const createShiftStateModel = (
  shifts: IShift[],
  week: number,
  year: number
) => {
  const data: IscheduleItem[] = [];

  shifts.map((x) => {
    const name = x.name;
    const item = data.find((x) => x.name === name);

    if (item) {
      item.shifts[x.day].push(x);
    }

    if (!item) {
      const newItem: IscheduleItem = {
        name,
        shifts: [[], [], [], [], [], [], []],
      };
      newItem.shifts[x.day].push(x);
      data.push(newItem);
    }
  });

  data.map((item) => {
    item.shifts.map((s) =>
      s.sort((a, b) => (a.timestamp > b.timestamp ? -1 : 1))
    );
  });

  data.sort((a, b) => (a.name > b.name ? 1 : -1));

  const result: IShiftStateModel = { week, year, data };
  return result;
};

export const setFilteredShiftsByName = (
  stateModel: IShiftStateModel,
  nameQuery: string
) => {
  const filteredList = [...stateModel.data].filter((x) => {
    if (x.name.toLowerCase().match(nameQuery)) return x;
  });
  return filteredList;
};
