import { useContext } from "react";
import { NavLink, useLocation } from "react-router-dom";
import { RouteNames } from "../../../core/router/RouteNames";
import { ReactComponent as Home } from "../../../assets/icons/Home.svg";
import { ReactComponent as Notification } from "../../../assets/icons/Notification.svg";
import { ReactComponent as Ads } from "../../../assets/icons/Ads.svg";
import { ReactComponent as User } from "../../../assets/icons/User.svg";
import { ReactComponent as NavigateRadialGradientFonts } from "../../../assets/icons/NavigateRadialGradientFonts.svg";
import { ReactComponent as DarkModeNavigateRadialGradientFonts } from "../../../assets/icons/DarkModeNavigateRadialGradientFonts.svg";
import { CheckMyHaveAccountContext } from "../../../contextProvider/CheckHaveAccountContext";
import { ColorModeContext } from "../../../contextProvider/MuiThemeContext";
import cn from "classnames";
import s from "./popUpNavigateGradient.module.scss";

interface LinkActiveType {
 isActive: boolean;
}

export const PopUpNavigateGradient = () => {
 const { checkThemeDark } = useContext(ColorModeContext);
 const { pathname } = useLocation();

 const { notHaveForms, handleOpen }: any = useContext(CheckMyHaveAccountContext);
 const setActive = ({ isActive }: LinkActiveType) => cn({ [s.active]: isActive });
 const openModalNotFoundAccount = () => notHaveForms && handleOpen();

 return (
  <div className={s.popUpNavigateGradient}>
   <div className={cn(s.tapLeftBlock, checkThemeDark ? s.darkBacgroundL : s.lightBacgroundL)}>
    <NavLink className={setActive} to={RouteNames.NEWS} aria-label="home">
     <Home className={checkThemeDark ? s.iconDark : s.icon} />
    </NavLink>

    <NavLink className={setActive} to={RouteNames.ADS} aria-label="ads" state={{ from: pathname }}>
     <Ads className={cn(checkThemeDark ? s.iconDark : s.icon, s.specifiedFill)} />
    </NavLink>
   </div>

   <span className={cn(s.radialGradientFontsWrapper)}>
    {checkThemeDark ? <DarkModeNavigateRadialGradientFonts /> : <NavigateRadialGradientFonts />}
    <NavLink
     to={notHaveForms ? "" : RouteNames.CREATE_ADS}
     aria-label="create-ads"
     onClick={openModalNotFoundAccount}
    >
     <div
      className={cn(
       s.duttonAdd,
       checkThemeDark ? s.darkThemeCenterButton : s.lightThemeCenterButton
      )}
     >
      <div className={cn(s.plas, checkThemeDark ? s.plasDarkMode : null)}></div>
     </div>
    </NavLink>
   </span>

   <div className={cn(s.tapRightBlock, checkThemeDark ? s.darkBacgroundR : s.lightBacgroundR)}>
    <NavLink className={setActive} to={RouteNames.HOME} aria-label="user">
     <User className={checkThemeDark ? s.iconDark : s.icon} />
    </NavLink>

    <NavLink
     className={!notHaveForms ? setActive : ""}
     to={notHaveForms ? "" : RouteNames.NOTIFICATION}
     aria-label="notification"
     onClick={openModalNotFoundAccount}
     state={{ from: pathname }}
    >
     <Notification className={checkThemeDark ? s.iconDark : s.icon} />
    </NavLink>
   </div>
  </div>
 );
};
