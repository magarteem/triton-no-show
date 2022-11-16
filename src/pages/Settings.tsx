import { Link } from "react-router-dom";
import { useAppDispatch } from "../core/redux/app/hooks";
import { logout } from "../modules/authorization/authSlice";
import { InButton } from "../common/ui-elements/button/InButton";
import { RouteNames } from "../common/variables/RouteNames";
import { NavigateButtonWidthAddBtn } from "../common/components/navigateButton/NavigateButtonWidthAddBtn";
import s from "./styles/settings.module.scss";
import { ButtonInstallPwa } from "../modules/pwa/ButtonInstallPwa";

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
    <ButtonInstallPwa />
   </div>
   <NavigateButtonWidthAddBtn />
  </>
 );
};
