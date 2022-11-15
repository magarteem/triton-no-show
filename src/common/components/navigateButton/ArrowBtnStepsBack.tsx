import { useNavigate } from "react-router-dom";
//import arrowReturnWhite from "../../../assets/icons/arrowReturnWhite.webp";
//import arrowReturnBlack from "../../../assets/icons/arrowReturnBlack.webp";
import s from "./arrowBtnStepsBack.module.scss";

interface ArrowBtnStepsBackType {
 cancelImgIcon: string;
}

export const ArrowBtnStepsBack = ({
 cancelImgIcon,
}: ArrowBtnStepsBackType) => {
 const navigate = useNavigate();
 const goBack = () => navigate(-1);

 return (
  <div className={s.btnBack} onClick={goBack}>
   <img
    src={cancelImgIcon}
    //src={darkArrow ? arrowReturnBlack : arrowReturnWhite}
    alt="back"
   />
  </div>
 );
};
