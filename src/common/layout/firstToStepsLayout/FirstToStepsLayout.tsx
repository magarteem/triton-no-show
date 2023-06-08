import { ReactNode } from "react";
import { Outlet, useOutletContext } from "react-router-dom";
import { LoginResponseType } from "../../../types/SSO/loginResponseType";
import s from "./firstToStepsLayout.module.scss";

interface OutletType {
  responseLogin: LoginResponseType;
  loading: boolean;
  error: boolean;
  children?: ReactNode;
}

export const FirstToStepsLayout = () => {
  const { responseLogin, loading, error, children }: OutletType = useOutletContext();

  return (
    <div className={s.firstToStepsLayout}>
      <Outlet context={{ responseLogin, loading, error }} />
      {children}
    </div>
  );
};
