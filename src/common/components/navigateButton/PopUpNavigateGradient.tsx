import { useContext } from "react";
import { NavLink } from "react-router-dom";
import { RouteNames } from "../../../core/router/RouteNames";
import { ReactComponent as Home } from "../../../assets/icons/Home.svg";
import { ReactComponent as Notification } from "../../../assets/icons/Notification.svg";
import { ReactComponent as Ads } from "../../../assets/icons/Ads.svg";
import { ReactComponent as User } from "../../../assets/icons/User.svg";
import { ReactComponent as NavigateRadialGradientFonts } from "../../../assets/icons/NavigateRadialGradientFonts.svg";
import { CheckMyHaveAccountContext } from "../../../contextProvider/CheckHaveAccountContext";
import cn from "classnames";
import s from "./popUpNavigateGradient.module.scss";

interface LinkActiveType {
  isActive: boolean;
}

export const PopUpNavigateGradient = () => {
  const { notHaveForms, handleOpen }: any = useContext(CheckMyHaveAccountContext);
  const setActive = ({ isActive }: LinkActiveType) => cn({ [s.active]: isActive });

  const openModalNotFoundAccount = () => {
    notHaveForms && handleOpen();
  };

  return (
    <div className={cn(s.popUpNavigateGradient)}>
      <div className={s.tapLeftBlock}>
        <NavLink className={setActive} to={RouteNames.NEWS} aria-label="home">
          <Home className={s.icon} />
        </NavLink>

        <NavLink className={setActive} to={RouteNames.ADS} aria-label="ads">
          <Ads className={cn(s.icon, s.specifiedFill)} />
        </NavLink>
      </div>

      <span className={s.radialGradientFontsWrapper}>
        <NavigateRadialGradientFonts />
        <NavLink
          to={notHaveForms ? "" : RouteNames.CREATE_ADS}
          aria-label="create-ads"
          onClick={openModalNotFoundAccount}
        >
          <div className={s.duttonAdd}>
            <div className={s.plas}></div>
          </div>
        </NavLink>
      </span>

      <div className={s.tapRightBlock}>
        <NavLink className={setActive} to={RouteNames.HOME} aria-label="user">
          <User className={s.icon} />
        </NavLink>

        <NavLink
          className={!notHaveForms ? setActive : ""}
          to={notHaveForms ? "" : RouteNames.NOTIFICATION}
          aria-label="notification"
          onClick={openModalNotFoundAccount}
        >
          <Notification className={s.icon} />
        </NavLink>
      </div>
    </div>
  );
};
