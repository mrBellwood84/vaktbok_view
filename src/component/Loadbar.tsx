import { Box, LinearProgress, Typography } from "@mui/material";

interface IProps {
  text: string;
  color: "primary" | "error";
  variant: "determinate" | "indeterminate";
}

const BaseProgressbar = ({ text, color, variant }: IProps) => {
  return (
    <Box>
      <Typography
        variant="h5"
        component="div"
        color={color}
        textAlign="center"
        sx={{ mt: 5, mb: 2 }}
      >
        {text}
      </Typography>
      <LinearProgress color={color} variant={variant} value={0} />
    </Box>
  );
};

export const DataLoadbar = () => {
  return (
    <BaseProgressbar
      text="Laster data.."
      color="primary"
      variant="indeterminate"
    />
  );
};

export const DataLoadbarFailed = () => {
  return (
    <BaseProgressbar
      text={"Lasting feilet!"}
      color="error"
      variant="determinate"
    />
  );
};
