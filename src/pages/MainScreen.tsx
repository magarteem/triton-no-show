import { Outlet } from "react-router-dom";
import { NavigateButton } from "../common/components/navigateButton/NavigateButton";
import { NavigateButtonWidthAddBtn } from "../common/components/navigateButton/NavigateButtonWidthAddBtn";
import s from "./styles/mainScreenPage.module.scss";

export const MainScreen = () => {
  return (
    <div className={s.mainScreen}>
      <Outlet />

      {/* <section className={s.footer}> */}
      {/* <NavigateButtonWidthAddBtn /> */}
      {/* <NavigateButton /> */}
      {/* </section> */}
    </div>
  );
};
