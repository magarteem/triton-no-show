import backgroundProfileHeader from "../../../../assets/images/backgroundProfileHeader.webp";
import { Link } from "react-router-dom";
import pencil from "../../../../assets/icons/Pencil.webp";
import settingsIcon from "../../../../assets/icons/settings.webp";
import { RouteNames } from "../../../variables/RouteNames";
import s from "./headerProfile.module.scss";
import { ArrowBtnStepsBack } from "../../navigateButton/ArrowBtnStepsBack";
import { AvatarPhoto } from "../avatarIcons/AvatarPhoto";

interface HeaderProfileType {
 textLabel: string;
 cancelImgIcon: string;
 change?: boolean;
 settings?: boolean;
}

export const HeaderProfile = ({
 textLabel,
 cancelImgIcon,
 change = false,
 settings = false,
}: HeaderProfileType) => {
 return (
  <div className={s.headerProfile}>
   <div className={s.title}>
    <div className={s.titleNavigation}>
     <ArrowBtnStepsBack cancelImgIcon={cancelImgIcon} />
     <p>{textLabel}</p>
    </div>

    <div className={s.titleSettings}>
     {change && (
      <Link to={RouteNames.CHANGE_PROFILE}>
       <img src={pencil} alt={pencil} />
      </Link>
     )}
     {settings && (
      <Link to={RouteNames.SETTINGS}>
       <img src={settingsIcon} alt={settingsIcon} />
      </Link>
     )}
    </div>
   </div>

   <AvatarPhoto avatarPhoto={backgroundProfileHeader} />
  </div>
 );
};
