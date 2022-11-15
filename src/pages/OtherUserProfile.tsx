import arrowReturnWhite from "../assets/icons/arrowReturnWhite.webp";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { NavigateButtonWidthAddBtn } from "../common/components/navigateButton/NavigateButtonWidthAddBtn";
import { AboutProfile } from "../common/components/profile/aboutProfile/AboutProfile";
import { HeaderProfile } from "../common/components/profile/cardsProfile/HeaderProfile";
import { HeaderWrapper } from "../common/layout/header/HeaderWrapper";
import { tempDataOtherUserProfile } from "../modules/user/service/tempDataOtherUserProfile";
import { InitialStateUserType } from "../modules/user/types/userSliceType";

const dataNull: InitialStateUserType = {
 id_user: "",
 name: "",
 email: "",
 sity: { value: "", label: "" },
 age: "",
 img_upload: "",
 gender: { value: "", label: "" },
 type_account: { value: "", label: "" },
 skills: {
  tool: [],
  genre: [],
  workExperience: [],
  education: [],
  master: { value: "", label: "" },
  inspiration: [],
 },
 private_settings: { value: "", label: "" },
};

export const OtherUserProfile = () => {
 const { id_user } = useParams();
 const [user, setUser] =
  useState<InitialStateUserType>(dataNull);

 useEffect(() => {
  // fetch(`..../user/${id_user}`).then(res => res.json()).then(data => setUser(data))
  const dataOneUser = tempDataOtherUserProfile.find(
   (x) => x.id_user === id_user
  );
  return dataOneUser && setUser(dataOneUser);
 }, [id_user]);

 return (
  <>
   <HeaderWrapper>
    <HeaderProfile
     textLabel={user.email}
     cancelImgIcon={arrowReturnWhite}
    />
   </HeaderWrapper>

   <AboutProfile userDataProfile={user} />

   <NavigateButtonWidthAddBtn />
  </>
 );
};
