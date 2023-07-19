import { useContext } from "react";
//import hourIcons from "../../../../../assets/icons/hourIcons.svg";
import { ReactComponent as HourIcons } from "../../../../../assets/icons/hourIcons.svg";
import { ColorModeContext } from "../../../../../contextProvider/MuiThemeContext";
import cn from "classnames";
import s from "./pending.module.scss";

export const Pending = () => {
 const { mode } = useContext(ColorModeContext);

 return (
  <div className={s.process}>
   {/*<img src={hourIcons} alt="hourIcons" />*/}
   <HourIcons className={cn({ [s.d_mode]: mode === "dark" })} />

   <span>В ожидании ответа</span>
  </div>
 );
};
