import backGroundImg from "../assets/images/backgroundProfileHeader.webp";
import arrowReturnWhite from "../assets/icons/arrowReturnWhite.webp";
import { NavigateButtonWidthAddBtn } from "../common/components/navigateButton/NavigateButtonWidthAddBtn";
import { AboutProfile } from "../common/components/profile/aboutProfile/AboutProfile";
import { HeaderProfile } from "../common/components/profile/cardsProfile/HeaderProfile";
import { HeaderWrapper } from "../common/layout/header/HeaderWrapper";
import { useAppSelector } from "../core/redux/app/hooks";

export const ProfileInfo = () => {
 const userDataProfile = useAppSelector(
  (state) => state.userSliceReducer
 );

 return (
  <>
   <HeaderWrapper srcPhoto={backGroundImg}>
    <HeaderProfile
     cancelImgIcon={arrowReturnWhite}
     textLabel={userDataProfile.email}
     change={true}
     settings={true}
    />
   </HeaderWrapper>

   <AboutProfile userDataProfile={userDataProfile} />

   <NavigateButtonWidthAddBtn />
  </>
 );
};
