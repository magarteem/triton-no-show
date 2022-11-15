import arrowReturnWhite from "../assets/icons/arrowReturnWhite.webp";
import backGroundImg from "../assets/images/backgroundProfileHeader.webp";
import { HeaderProfile } from "../common/components/profile/cardsProfile/HeaderProfile";
import { HeaderWrapper } from "../common/layout/header/HeaderWrapper";
import { useAppSelector } from "../core/redux/app/hooks";
import { ChangePhoto } from "../modules/user/ChangePhoto";
import { FormChangeProfile } from "../modules/user/FormChangeProfile";
import s from "./styles/changeProfile.module.scss";

export const ChangeProfile = () => {
 const userDataProfile = useAppSelector(
  (state) => state.userSliceReducer
 );
 return (
  <>
   <HeaderWrapper srcPhoto={backGroundImg}>
    <HeaderProfile
     textLabel="Редактировать профиль"
     cancelImgIcon={arrowReturnWhite}
    />
   </HeaderWrapper>

   <section className={s.main}>
    <div className={s.changeAvatar}>
     <ChangePhoto />
    </div>
    <div className={s.addSecondProfile}>
     <button className={s.styleText}>
      Добавить вторую анкету
     </button>
    </div>

    <div className={s.formChangeProfile}>
     <FormChangeProfile userDataProfile={userDataProfile} />
    </div>
   </section>
  </>
 );
};
