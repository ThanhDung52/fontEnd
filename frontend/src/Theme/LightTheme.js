import { createTheme } from "@mui/material/styles";

export const lightTheme = createTheme({
  palette: {
    mode: "light",
    primary: {
      main: "#e91e63",
    },
    secondary: {
      main: "#5A20CB",
    },
    background: {
      default: "#ffffff",
      paper: "#f0f0f0",
    },
    text: {
      primary: "#000000",
    },
  },
});
