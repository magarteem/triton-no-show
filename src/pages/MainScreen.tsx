import { useEffect } from "react";
import { Outlet } from "react-router-dom";
import { useAppDispatch } from "../core/redux/app/hooks";
import { getMyProfileApiThunk } from "../modules/user/getMyProfileApiThunk";
import { resetState } from "../modules/user/userSlice";
import s from "./styles/mainScreenPage.module.scss";

export const MainScreen = () => {
 let isTooSoon = true;
 window.addEventListener("beforeinstallprompt", (e) => {
  if (isTooSoon) {
   e.preventDefault(); // Prevents prompt display
   // Prompt later instead:
   setTimeout(() => {
    isTooSoon = false;
    //@ts-ignore
    e.prompt(); // Throws if called more than once or default not prevented
   }, 10000);
  }

  // The event was re-dispatched in response to our request
  // …
 });

 const dispatch = useAppDispatch();
 useEffect(() => {
  dispatch(resetState());
  dispatch(getMyProfileApiThunk());
 }, [dispatch]);

 return (
  <div className={s.mainScreen}>
   <p>444444444444</p>
   <Outlet />
  </div>
 );
};
