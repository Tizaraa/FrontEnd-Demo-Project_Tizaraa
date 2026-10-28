"use client";

import { PropsWithChildren } from "react";
import { ThemeProvider } from "styled-components";
import { ThemeProvider as MuiThemeProvider } from "@mui/material/styles";

// CUSTOM THEME
import theme from "theme";
import GlobalStyles from "theme/global-styles/globalStyles";
import muiTheme from "theme/muiTheme";

export default function StyledContext({ children }: PropsWithChildren) {
 return (
  <ThemeProvider theme={theme()}>
   <MuiThemeProvider theme={muiTheme}>
    <GlobalStyles />
    {children}
   </MuiThemeProvider>
  </ThemeProvider>
 );
}
