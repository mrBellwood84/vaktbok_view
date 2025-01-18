"use client";

import {
  Skeleton,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
} from "@mui/material";
import { Fragment } from "react";

export const ScheduleTableLoading = () => {
  const cells = [...Array(7).keys()];

  return (
    <Fragment>
      <TableHead>
        <TableRow>
          {cells.map((x) => (
            <TableCell key={`header-${x}`}>
              <Skeleton variant="rounded" height={42} />
            </TableCell>
          ))}
        </TableRow>
      </TableHead>
      <TableBody>
        {cells.map((x) => (
          <TableRow key={`body-row-${x}`}>
            {cells.map((y) => (
              <TableCell key={`body-cell-${x}-${y}`}>
                <Skeleton variant="text" />
              </TableCell>
            ))}
          </TableRow>
        ))}
      </TableBody>
    </Fragment>
  );
};
