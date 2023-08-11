import { useLocation, useNavigate } from "react-router-dom";
import { RouteNames } from "../core/router/RouteNames";
import { useEffect, useLayoutEffect } from "react";
import { useLocalStorage } from "./useLocalStorage";

export const useHandleEventBrowserGoToBack = () => {
 const [goToBack, setGoToBack] = useLocalStorage("go-to-back", "");
 const navigate = useNavigate();
 const { state } = useLocation();

 const handlePopstate = (e: any) => {
  e.preventDefault();
  if (state) navigate(state.from);
  else if (!!goToBack) navigate(goToBack);
  else navigate(RouteNames.HOME);
 };

 useEffect(() => {
  window.addEventListener("popstate", handlePopstate);
  return () => {
   window.removeEventListener("popstate", handlePopstate);
  };
 }, []);

 return null;
};
