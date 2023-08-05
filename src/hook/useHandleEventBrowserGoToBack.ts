import { useLocation, useNavigate } from "react-router-dom";
import { RouteNames } from "../core/router/RouteNames";
import { useEffect } from "react";

export const useHandleEventBrowserGoToBack = () => {
 const navigate = useNavigate();
 const { state } = useLocation();

 const handlePopstate = (e: any) => {
  e.preventDefault();
  e.stopPropagation();

  if (state) navigate(state.from);
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
