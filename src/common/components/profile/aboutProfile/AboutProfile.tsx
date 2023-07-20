import { Link, useLocation, useParams } from "react-router-dom";
import { InitialStateUserType } from "../../../../modules/user/types/userSliceType";
import { BtnUserContact } from "./skills/BtnUserContact";
import { SkillsLayoutMaster } from "./skills/SkillsLayoutMaster";
import { SkillsLayoutGenre } from "./skills/SkillsLayoutGenre";
import { SkillsLayoutTools } from "./skills/SkillsLayoutTools";
import { NameProfile } from "../nameProfile/NameProfile";
import { WorkExperienceCard } from "./skills/WorkExperienceCards";
import { RouteNames } from "../../../../core/router/RouteNames";
import { EnumTypeAccount } from "../../../../types/PROFILE/enum/EnumTypeAccount";
import { useAppSelector } from "../../../../core/redux/app/hooks";
import { Portfolio } from "./portfolio/Portfolio";
import { About } from "./about/About";
import { Contacts } from "./contacts/Contacts";
import { EnumPrivateType } from "../../../../types/PROFILE/enum/EnumPrivateType";
import { EnumContactRequestStatusResponse } from "../../../../types/PROFILE/enum/EnumContactRequestStatusResponse";
import s from "./aboutProfile.module.scss";

import ReactPWAInstallProvider, { useReactPWAInstall } from "react-pwa-install";
import myLogo from "../../../../assets/icons/Play.webp";

interface AboutProfileType {
 userDataProfile: InitialStateUserType;
 notHaveForms?: boolean;
}

export const AboutProfile = ({ userDataProfile, notHaveForms }: AboutProfileType) => {
 const { isActiveForms } = useAppSelector((state) => state.userSliceReducer);
 const { nameForms: parseJson, id: parseJsonId } = isActiveForms && JSON.parse(isActiveForms);

 const { id_user } = useParams();
 const { pathname } = useLocation();
 const {
  skills: { education, genre, inspiration, master, tool, workExperience },
  id_user: id_userForm,
  age,
  city,
  email,
  name,
  phone,
  portfolio_photo,
  webSite,
  from_opening_hours,
  to_opening_hours,
  metroId,
  address,
  area,
  type_collective,
  institutionType,
  schedule,
  private_settings,
  privateType,
  contactRequestStatus,
 } = userDataProfile;

 const checkPath = () => {
  if (pathname.includes(RouteNames.OTHER_PROFILE_USER)) {
   const watchMisician = userDataProfile.type_account.name === EnumTypeAccount.MUSICIAN;
   const watchTeam = userDataProfile.type_account.name === EnumTypeAccount.TEAM;
   const watchMisicLover =
    userDataProfile.type_account.name === EnumTypeAccount.MUSIC_LOVER.toLocaleLowerCase();
   return { watchMisician, watchTeam, watchMisicLover };
  } else {
   const watchMisician = parseJson === EnumTypeAccount.MUSICIAN;
   const watchTeam = parseJson === EnumTypeAccount.TEAM;
   const watchMisicLover = parseJson === EnumTypeAccount.MUSIC_LOVER;
   return { watchMisician, watchTeam, watchMisicLover };
  }
 };

 const { pwaInstall, supported, isInstalled } = useReactPWAInstall();
 const handleClick = () => {
  pwaInstall({
   title: "Install Web App",
   logo: myLogo,
   features: (
    <ul>
     <li>Cool feature 1</li>
     <li>Cool feature 2</li>
     <li>Even cooler feature</li>
     <li>Works offline</li>
    </ul>
   ),
   description: "This is a very good app that does a lot of useful stuff. ",
  })
   .then(() => alert("App installed successfully or instructions for install shown"))
   .catch(() => alert("User opted out from installing"));
 };

 return (
  <>
   <section className={s.main}>
    <NameProfile
     age={age || 0}
     name={name}
     city={city?.name}
     merto={metroId}
     address={address}
     type_collective={type_collective?.name || institutionType?.name}
    />

    <div>
     {supported() && !isInstalled() && (
      <button type="button" onClick={handleClick}>
       Install App
      </button>
     )}
    </div>

    {id_user &&
     (privateType === EnumPrivateType.HIDE_CONTACTS || privateType === EnumPrivateType.HIDE_ALL) &&
     contactRequestStatus !== EnumContactRequestStatusResponse.MY_FORM && (
      <div className={s.noBorder}>
       <BtnUserContact
        contactRequestStatus={contactRequestStatus}
        id_userForm={id_userForm}
        parseJsonId={parseJsonId}
        privateType={privateType}
       />
      </div>
     )}

    <div className={s.linkPublicationsMusician}>
     <Link
      to={
       id_user
        ? RouteNames.OTHER_USER_POSTS
        : `${RouteNames.OTHER_PROFILE_USER}/${parseJsonId}/${RouteNames.OTHER_USER_POSTS}`
      }
     >
      {contactRequestStatus === EnumContactRequestStatusResponse.MY_FORM || !id_user ? (
       !notHaveForms ? (
        "Мои публикации"
       ) : (
        <Link to={RouteNames.ADD_NEW_ACCOUNT}>Создать аккаунт</Link>
       )
      ) : (
       "Публикации пользователя"
      )}
     </Link>
    </div>

    {tool.length > 0 && (
     <SkillsLayoutTools
      skillsDataItem={tool}
      skillsCategoryTitle={
       checkPath().watchMisicLover
        ? "Интересующие инструменты"
        : checkPath().watchMisician
        ? "Инструменты"
        : "Состав"
      }
     />
    )}

    {genre.length > 0 && (
     <SkillsLayoutGenre
      skillsDataItem={genre}
      skillsCategoryTitle={checkPath().watchMisicLover ? "Любимый жанр" : "Жанр"}
     />
    )}
    {master && <SkillsLayoutMaster skillsDataItem={master} skillsCategoryTitle="Мастерство" />}

    {!!workExperience && (
     <WorkExperienceCard workExperience={workExperience} skillsCategoryTitle="Опыт работы" />
    )}

    {!!education && (
     <WorkExperienceCard workExperience={education} skillsCategoryTitle="Образование" />
    )}

    {pathname.includes(RouteNames.OTHER_PROFILE_USER)
     ? !checkPath().watchMisician &&
       !checkPath().watchTeam &&
       (!!schedule?.Friday || !!inspiration || !!area) && (
        <About schedule={schedule} inspiration={inspiration} area={area} />
       )
     : !notHaveForms &&
       !checkPath().watchMisician &&
       !checkPath().watchTeam &&
       (!!schedule?.Friday || !!inspiration || !!area) && (
        <About schedule={schedule} inspiration={inspiration} area={area} />
       )}

    {(portfolio_photo || !!inspiration.length) && (
     <Portfolio
      portfolio_photo={portfolio_photo}
      inspiration={inspiration}
      watchAccountType={checkPath()}
     />
    )}

    {(phone || email || webSite) && <Contacts phone={phone} email={email} webSite={webSite} />}
   </section>
  </>
 );
};
