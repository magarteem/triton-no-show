import { Link } from "react-router-dom";
import { useAppDispatch } from "../../../core/redux/app/hooks";
import { logout } from "../../../modules/authorization/authSlice";
import { InButton } from "../../ui-elements/button/InButton";
import { RouteNames } from "../../variables/RouteNames";
import { NavigateButtonWidthAddBtn } from "../navigateButton/NavigateButtonWidthAddBtn";
import s from "./settings.module.scss";

export const Settings = () => {
  const dispatch = useAppDispatch();
  const logoutHandle = () => dispatch(logout());

  return (
    <>
      <div className={s.settings}>
        <Link
          className={s.styleBtn}
          onClick={logoutHandle}
          to={RouteNames.LOGIN}
        >
          <InButton textButton="Выход" />
        </Link>
        <Link className={s.styleBtn} to={RouteNames.USER}>
          <InButton textButton="Назад" />
        </Link>
      </div>
      <NavigateButtonWidthAddBtn />
    </>
  );
};
