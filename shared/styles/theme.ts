import { createMuiTheme } from "@material-ui/core/styles";

import grey from "@material-ui/core/colors/grey";
import purple from "@material-ui/core/colors/purple";
import green from "@material-ui/core/colors/green";

const theme = createMuiTheme({
  overrides: {
    MuiInput: {
      root: {
        color: grey["100"],
      },
      input: {
        color: grey["100"],
      },
    },
    MuiInputBase: {
      root: {
        color: grey["100"],
      },
      input: {
        color: grey["100"],
      },
    },
    MuiTypography: {
      root: {
        color: grey["100"],
      },
    },
    MuiSvgIcon: {
      root: {
        color: grey["100"],
      },
    },
  },
  palette: {
    primary: {
      light: purple["100"],
      main: purple["200"],
      dark: purple["300"],
    },
    secondary: {
      light: green["100"],
      main: green["200"],
      dark: green["300"],
    },
    background: {
      default: grey["900"],
      paper: grey["800"],
    },
    type: "dark",
  },
});

export default theme;
