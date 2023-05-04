import { useEffect } from "react";
import { Outlet } from "react-router-dom";
import { useAppDispatch } from "../core/redux/app/hooks";
import { getMyProfileApiThunk } from "../modules/user/getMyProfileApiThunk";
import { resetState } from "../modules/user/userSlice";
import s from "./styles/mainScreenPage.module.scss";
declare const self: ServiceWorkerGlobalScope;

export const MainScreen = () => {
 self.addEventListener("install", (event) => {
  // forces a service worker to activate immediately (forces update)
  alert("tyyyyyyy");
  self.skipWaiting();
 });

 const dispatch = useAppDispatch();
 useEffect(() => {
  dispatch(resetState());
  dispatch(getMyProfileApiThunk());
 }, [dispatch]);

 return (
  <div className={s.mainScreen}>
   <p>333333333333</p>
   <Outlet />
  </div>
 );
};
