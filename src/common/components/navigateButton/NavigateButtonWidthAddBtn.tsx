import cn from "classnames";
import { NavLink, useLocation } from "react-router-dom";
import { RouteNames } from "../../variables/RouteNames";
import { ReactComponent as Home } from "../../../assets/icons/Home.svg";
import { ReactComponent as Notification } from "../../../assets/icons/Notification.svg";
import { ReactComponent as Ads } from "../../../assets/icons/Ads.svg";
import { ReactComponent as User } from "../../../assets/icons/User.svg";
// import { ReactComponent as Chats } from "../../../assets/icons/Chats.svg";
import s from "./navigateButtonWidthAddBtn.module.scss";

interface LinkActiveType {
  isActive: boolean;
}

export const NavigateButtonWidthAddBtn = () => {
  let { pathname } = useLocation();
  const location = pathname.includes("/other-user-profile");

  const setActive = ({ isActive }: LinkActiveType) =>
    cn({ [s.active]: isActive });

  return (
    <div className={cn(s.widthAddButton, { [s.greenBackground]: location })}>
      <div className={s.navLeftBlock}>
        <NavLink className={setActive} to={RouteNames.HOME} aria-label="home">
          <Home
            className={cn(s.icon, {
              [s.greenBackground]: location,
            })}
          />
        </NavLink>

        <NavLink className={setActive} to={RouteNames.ADS} aria-label="ads">
          <Ads
            className={cn(s.icon, {
              [s.greenBackground]: location,
            })}
          />
        </NavLink>
      </div>

      <div className={s.nalRightBlock}>
        <NavLink className={setActive} to={RouteNames.USER} aria-label="user">
          <User
            className={cn(s.icon, {
              [s.greenBackground]: location,
            })}
          />
        </NavLink>

        <NavLink
          className={setActive}
          to={RouteNames.NOTIFICATION}
          aria-label="notification"
        >
          <Notification
            className={cn(s.icon, {
              [s.greenBackground]: location,
            })}
          />
        </NavLink>
      </div>

      <div className={s.duttonAdd}>
        <div className={s.plas}></div>
      </div>
    </div>
  );
};
