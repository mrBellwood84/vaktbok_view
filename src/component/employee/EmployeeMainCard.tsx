import { useAppSelector } from "@/lib/store/hooks";
import { Box, Typography } from "@mui/material";

export const EmployeeMainCard = () => {
  const selected = useAppSelector((state) => state.employee.selected);

  if (!selected)
    return (
      <Typography
        variant="h5"
        component="div"
        sx={{ fontStyle: "italic", color: "gray", mt: 1 }}
      >
        Ingen ansatt valgt
      </Typography>
    );

  return (
    <Box sx={{ mr: 3 }}>
      <Typography variant="h5" component="div" sx={{ mt: 1 }}>
        {selected.name}
      </Typography>
    </Box>
  );
};
