import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";

import { Container, CssBaseline } from "@mui/material";
import type { Metadata } from "next";
import { ReactNode } from "react";

import TopBar from "@/component/TopBar";
import StoreProvider from "@/component/StoreProvider";

export const metadata: Metadata = {
  title: "Vaktbok Viewer",
  description: "",
};

interface IProps {
  children: ReactNode;
}

const RootLayout = ({ children }: IProps) => {
  return (
    <CssBaseline>
      <html lang="no">
        <body>
          <StoreProvider>
            <TopBar />
            <Container sx={{ mt: 2 }}>{children}</Container>
          </StoreProvider>
        </body>
      </html>
    </CssBaseline>
  );
};

export default RootLayout;
