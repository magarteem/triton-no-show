import { useEffect } from "react";
import { Outlet, useLocation } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../core/redux/app/hooks";
import { getMyProfileApiThunk } from "../modules/user/getMyProfileApiThunk";
import { resetState } from "../modules/user/userSlice";
import { CheckHaveAccountContext } from "../contextProvider/CheckHaveAccountContext";
import apiSSO from "../api/axiosConfigSSO";
import { notAuthLogout } from "../api/helpers";
import s from "./styles/mainScreenPage.module.scss";
import { ErrorNotification } from "../common/components/errorNotification/ErrorNotification";
import { PopUpNavigateGradient } from "../common/components/navigateButton/PopUpNavigateGradient";
import { PullToRefreshLayout } from "../common/layout/PullToRefreshLayout/PullToRefreshLayout";
import { RouteNames } from "../core/router/RouteNames";

export const MainScreen = () => {
 const { pathname } = useLocation();
 const dispatch = useAppDispatch();
 const { checkError, errStatus } = useAppSelector((state) => state.errorStoreReducer);

 useEffect(() => {
  dispatch(resetState());

  async function getToket() {
   try {
    const access_token = await apiSSO.post(`auth/refresh_token`);
    localStorage.setItem("auth-token", `${access_token.data.token.value}`);
   } catch (error) {
    notAuthLogout();
   }
  }
  getToket();

  dispatch(getMyProfileApiThunk());
 }, [dispatch]);

 const pathHiddenPopUpNavigate =
  pathname.includes(RouteNames.REGISTER) ||
  pathname.includes(RouteNames.LOGIN) ||
  pathname.includes(RouteNames.REQUEST_RESET_PASSWORD) ||
  pathname.includes(RouteNames.RESET_PASSWORD) ||
  pathname.includes(RouteNames.ADD_NEW_ACCOUNT) ||
  pathname.includes(RouteNames.SETTINGS) ||
  pathname.includes(RouteNames.CHANGE_PROFILE) ||
  pathname.includes(RouteNames.ADD_NEW_NEWS) ||
  pathname.includes(RouteNames.CREATE_ADS);

 return (
  <CheckHaveAccountContext>
   <div className={s.mainScreen}>
    <PullToRefreshLayout>
     <Outlet />
    </PullToRefreshLayout>

    {!pathHiddenPopUpNavigate && <PopUpNavigateGradient />}
   </div>

   {checkError && (
    <ErrorNotification checkError={checkError} errStatus={errStatus} autoHideDuration={null} />
   )}
  </CheckHaveAccountContext>
 );
};
