import { createTheme } from "@mui/material/styles";

export const darkThemeMui = createTheme({
 palette: {
  //@ts-ignore
  TextFieldElementMui: {
   main: "#F1F1EA !important",
   placeholder: "#0717e8",
   helperText: "#ffffff99",
  },
  SelectorElementMui: {
   arrow: "#fff !important",
  },
  TabsComponents: {
   colorTitle: "#f4f5f3",
   colorTitleActive: "#43a303",
  },
  Filter: {
   placeholder: "#fff",
  },
  Button: {
   disabled: "#f3f3ed61",
  },
 },
});
