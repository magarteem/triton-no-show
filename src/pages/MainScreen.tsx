import { useEffect } from "react";
import { Outlet } from "react-router-dom";
import { useAppDispatch } from "../core/redux/app/hooks";
import { getMyProfileApiThunk } from "../modules/user/getMyProfileApiThunk";
import { resetState } from "../modules/user/userSlice";
import { CheckHaveAccountContext } from "../contextProvider/CheckHaveAccountContext";
import s from "./styles/mainScreenPage.module.scss";

export const MainScreen = () => {
 const dispatch = useAppDispatch();

 useEffect(() => {
  dispatch(resetState());
  dispatch(getMyProfileApiThunk());
 }, [dispatch]);

 return (
  <CheckHaveAccountContext>
   <div className={s.mainScreen}>
    <Outlet />
   </div>
  </CheckHaveAccountContext>
 );
};
