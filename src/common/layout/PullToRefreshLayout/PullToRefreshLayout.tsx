import { useLocation } from "react-router-dom";
import PullToRefresh from "react-simple-pull-to-refresh";
import { RouteNames } from "../../../core/router/RouteNames";
import cn from "classnames";
import s from "./pullToRefreshLayout.module.scss";

interface PullToRefreshLayoutType {
 children: JSX.Element;
}

export const PullToRefreshLayout = ({ children }: PullToRefreshLayoutType) => {
 const { pathname } = useLocation();
 const handleRefresh = async () => window.location.reload();

 const pathBackgrountRed =
  pathname.includes(RouteNames.LICENSE) ||
  pathname.includes(RouteNames.CREATE_ADS) ||
  pathname.includes(RouteNames.ADD_NEW_NEWS);

 const pathHiddenPopUpNavigate =
  pathname === RouteNames.HOME ||
  pathname.includes(RouteNames.ADD_NEW_ACCOUNT) ||
  pathname.includes(RouteNames.CHANGE_PROFILE) ||
  pathname.includes(RouteNames.ADD_NEW_NEWS) ||
  pathname.includes(RouteNames.CREATE_ADS);

 const windowInnerWidth = document.documentElement.clientWidth;

 return (
  <PullToRefresh
   onRefresh={handleRefresh}
   pullingContent=""
   isPullable={windowInnerWidth < 1200 && !pathHiddenPopUpNavigate ? true : false}
   className={cn(s.mainWrap, {
    //[s.colorOrange]: pathBackgrountOrange,
    [s.colorRed]: pathBackgrountRed,
   })}
  >
   {children}
  </PullToRefresh>
 );
};
