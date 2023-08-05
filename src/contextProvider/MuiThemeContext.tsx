import { createContext, ReactNode, useState, useMemo, useEffect } from "react";
import { useLocalStorage } from "../hook/useLocalStorage";
import { ThemeProvider } from "@mui/material/styles";
import { darkThemeMui } from "./darkThemeMui";
import { themeMui } from "./themeMui";

//declare module "@mui/material/styles" {
// interface CustomTheme extends Theme {
//  TextFieldElementMui: {
//   main: string;
//  };
// }
// // allow configuration using `createTheme`
// interface CustomThemeOptions extends ThemeOptions {
//  TextFieldElementMui?: {
//   main?: string;
//  };
// }
// export function createTheme(options?: CustomThemeOptions): CustomTheme;
//}

interface Props {
 children: ReactNode;
}
type PaletteMode = "light" | "dark";

interface ColorModeContextType {
 mode: PaletteMode;
 toggleColorMode: () => void;
 checkThemeDark: boolean;
}
export const ColorModeContext = createContext<ColorModeContextType>({
 mode: "light",
 toggleColorMode: () => {},
 checkThemeDark: false,
});

export const MuiThemeContext = ({ children }: Props) => {
 const [nameTheme, setNameTheme] = useLocalStorage("theme", "");
 const [mode, setMode] = useState<PaletteMode>(nameTheme || "light");

 const colorMode = useMemo(
  () => ({
   toggleColorMode: () => {
    setMode((prevMode) => (prevMode === "light" ? "dark" : "light"));
   },
   mode,
   checkThemeDark: mode === "dark" ? true : false,
  }),
  [mode]
 );

 useEffect(() => {
  setNameTheme(mode);
 }, [setNameTheme, mode]);

 return (
  <ColorModeContext.Provider value={colorMode}>
   <ThemeProvider theme={mode === "dark" ? darkThemeMui : themeMui}>{children}</ThemeProvider>
  </ColorModeContext.Provider>
 );
};
