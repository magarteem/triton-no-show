import { createContext, ReactNode, useEffect, useState } from "react";
import { useLocalStorage } from "../hook/useLocalStorage";

interface Props {
 children: ReactNode;
}

export const ContextTheme = createContext({});

function changeCssRootVariables(temeState: string) {
 const root = document.querySelector(":root") as HTMLElement;
 const components = [
  "body-background",
  "body-text-color",
  "body-text-color-second",
  "title-color",
  "name-profile-color",
  "green-color-text",
 ];
 components.forEach((component) => {
  root.style.setProperty(`--${component}-default`, `var(--${component}-${temeState})`);
 });
}

export const ThemeContext = ({ children, ...props }: Props) => {
 const [nameTheme, setNameTheme] = useLocalStorage("theme", "");
 const [temeState, setTemeState] = useState(nameTheme || "light");

 useEffect(() => {
  setNameTheme(temeState);
  changeCssRootVariables(temeState);
 }, [setNameTheme, temeState]);

 function changeTheme(teme: string) {
  setTemeState(teme);
 }

 return (
  <ContextTheme.Provider value={{ temeState, changeTheme }} {...props}>
   {children}
  </ContextTheme.Provider>
 );
};
