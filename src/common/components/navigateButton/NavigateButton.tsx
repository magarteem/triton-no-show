import cn from "classnames";
import { NavLink } from "react-router-dom";
import { RouteNames } from "../../variables/RouteNames";
import { ReactComponent as Home } from "../../../assets/icons/Home.svg";
import { ReactComponent as Notification } from "../../../assets/icons/Notification.svg";
import { ReactComponent as Ads } from "../../../assets/icons/Ads.svg";
import { ReactComponent as User } from "../../../assets/icons/User.svg";
import { ReactComponent as Chats } from "../../../assets/icons/Chats.svg";
import s from "./navigateButton.module.scss";

interface LinkActiveType {
  isActive: boolean;
}

export const NavigateButton = () => {
  const setActive = ({ isActive }: LinkActiveType) =>
    cn({ [s.active]: isActive });

  return (
    <div className={s.widthAddButton}>
      <NavLink className={setActive} to={RouteNames.HOME} aria-label="home">
        <Home className={cn(s.icon, s.activeSpecified)} />
      </NavLink>

      <NavLink className={setActive} to={RouteNames.ADS} aria-label="ads">
        <Ads className={cn(s.icon, s.activeSpecified)} />
      </NavLink>

      <NavLink className={setActive} to={RouteNames.USER} aria-label="user">
        <User className={s.icon} />
      </NavLink>

      {/* <NavLink className={setActive} to={RouteNames.CHATS} aria-label="chats">
        <Chats className={s.icon} />
      </NavLink> */}

      <NavLink
        className={setActive}
        to={RouteNames.NOTIFICATION}
        aria-label="notification"
      >
        <Notification className={s.icon} />
      </NavLink>
    </div>
  );
};
