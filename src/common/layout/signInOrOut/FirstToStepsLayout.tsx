import { ReactNode } from "react";
import { Outlet } from "react-router-dom";
import s from "./firstToStepsLayout.module.scss";

interface FirstToStepsLayoutType {
 children?: ReactNode;
}

export const FirstToStepsLayout = ({
 children,
}: FirstToStepsLayoutType) => {
 return (
  <div className={s.firstToStepsLayout}>
   <Outlet />
  </div>
 );
};
