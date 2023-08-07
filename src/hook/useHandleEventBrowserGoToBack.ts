import { useLocation, useNavigate } from "react-router-dom";
import { RouteNames } from "../core/router/RouteNames";
import { useEffect } from "react";
import { useCheckSwipeDevises } from "./useCheckSwipeDevises";
import { isIos } from "../modules/pwa/pwaInstall/pwaInstall";

export const useHandleEventBrowserGoToBack = () => {
 const ifGoToBackSwiperForIos = useCheckSwipeDevises();
 const navigate = useNavigate();
 const { state } = useLocation();

 const handlePopstate = (e: any) => {
  if (isIos() && ifGoToBackSwiperForIos) {
   navigate(RouteNames.HOME);
  } else {
   e.preventDefault();
   if (state) navigate(state.from);
   else navigate(RouteNames.HOME);
  }
 };

 useEffect(() => {
  window.addEventListener("popstate", handlePopstate);
  return () => {
   window.removeEventListener("popstate", handlePopstate);
  };
 }, []);

 return null;
};
