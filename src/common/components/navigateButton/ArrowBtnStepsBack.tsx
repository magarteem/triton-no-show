import { IconButton } from "@mui/material";
import { ReactNode } from "react";
import { useNavigate } from "react-router-dom";
import cn from "classnames";
import s from "./arrowBtnStepsBack.module.scss";

interface ArrowBtnStepsBackType {
 cancelImgIcon: string | ReactNode;
 mode?: "dark" | "light";
}

export const ArrowBtnStepsBack = ({ cancelImgIcon, mode }: ArrowBtnStepsBackType) => {
 const navigate = useNavigate();
 const goBack = () => navigate(-1);

 return (
  <div className={s.btnBack} onClick={goBack}>
   {typeof cancelImgIcon === "string" ? (
    <IconButton>
     <img src={cancelImgIcon} alt="back" />
    </IconButton>
   ) : (
    <IconButton className={cn({ [s.imgIcon]: mode === "dark" })}>{cancelImgIcon}</IconButton>
   )}
  </div>
 );
};
