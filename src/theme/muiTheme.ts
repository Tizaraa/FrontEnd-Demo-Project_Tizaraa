import { createTheme } from "@mui/material/styles";
import tz from "./tizaraa";

// Brings the MUI components used in checkout, header and listings onto the brand tokens
const muiTheme = createTheme({
 palette: {
  primary: { main: tz.color.emberDeep, dark: tz.color.emberDark, light: tz.color.ember, contrastText: "#fff" },
  secondary: { main: tz.color.navy, contrastText: "#fff" },
  error: { main: tz.tone.danger.fg },
  warning: { main: tz.tone.warning.fill },
  success: { main: tz.tone.success.fill },
  info: { main: tz.color.navy },
  text: { primary: tz.color.ink, secondary: tz.color.slate },
  divider: tz.color.line,
  background: { default: tz.color.mist, paper: tz.color.paper },
 },
 typography: {
  fontFamily: tz.font.body,
  h1: { fontFamily: tz.font.display },
  h2: { fontFamily: tz.font.display },
  h3: { fontFamily: tz.font.display },
  h4: { fontFamily: tz.font.display },
  h5: { fontFamily: tz.font.display },
  h6: { fontFamily: tz.font.display },
  button: { textTransform: "none", fontWeight: 600 },
 },
 shape: { borderRadius: tz.radius.sm },
 components: {
  MuiButton: { styleOverrides: { root: { borderRadius: tz.radius.md, boxShadow: "none" } } },
  MuiPaper: { styleOverrides: { rounded: { borderRadius: tz.radius.md } } },
 },
});

export default muiTheme;
