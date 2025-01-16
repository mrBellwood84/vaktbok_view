import {
  AppBar,
  Box,
  Button,
  ButtonGroup,
  Toolbar,
  Typography,
} from "@mui/material";

interface ITopBarItem {
  label: string;
  href: string;
}

const TopBarButton = ({ label, href }: ITopBarItem) => {
  return (
    <Button href={href} sx={{ color: "white", borderColor: "white" }}>
      {label}
    </Button>
  );
};

const TopBar = () => {
  const buttons: ITopBarItem[] = [
    {
      label: "Hjem",
      href: "/",
    },
    {
      label: "Vaktplan",
      href: "/schedule",
    },
    {
      label: "Ansatt",
      href: "/employee",
    },
    {
      label: "Skiftkoder",
      href: "/shiftcode",
    },
  ];

  return (
    <Box>
      <AppBar
        position="static"
        sx={{
          userSelect: "none",
        }}
      >
        <Toolbar>
          <Typography
            variant="h6"
            component="div"
            letterSpacing={1.5}
            sx={{ mr: 1 }}
          >
            VAKTBOK
          </Typography>
          <ButtonGroup
            variant="text"
            sx={{
              color: "white",
            }}
          >
            {buttons.map((x, i) => (
              <TopBarButton
                key={`topbar-key-${i}`}
                label={x.label}
                href={x.href}
              />
            ))}
          </ButtonGroup>
        </Toolbar>
      </AppBar>
    </Box>
  );
};

export default TopBar;
