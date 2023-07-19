import { createTheme } from "@mui/material/styles";

export const themeMui = createTheme({
 palette: {
  //@ts-ignore
  TextFieldElementMui: {
   main: "#1A1C18 !important",
   placeholder: "#dfc806",
   helperText: "#0009",
  },
  SelectorElementMui: {
   arrow: "#000 !important",
  },
  TabsComponents: {
   colorTitle: "#43483E",
   colorTitleActive: "#2b6c00",
  },
  Filter: {
   placeholder: "#242424",
  },
  Button: {
   disabled: "#00000042",
  },
 },
});
