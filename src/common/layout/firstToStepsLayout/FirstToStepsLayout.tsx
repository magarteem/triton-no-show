import { Outlet, useOutletContext } from "react-router-dom";
import { LoginResponseType } from "../../../types/SSO/loginResponseType";
import s from "./firstToStepsLayout.module.scss";

export const FirstToStepsLayout = () => {
 const [responseLogin, loading, error]: [LoginResponseType, boolean, boolean] = useOutletContext();

 return (
  <div className={s.firstToStepsLayout}>
   <Outlet context={[responseLogin, loading, error]} />
  </div>
 );
};
