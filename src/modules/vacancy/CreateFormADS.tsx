import { useFormContext } from "react-hook-form";
import { BtnInGroupeSaveCancelMui } from "../../common/components/navigateButton/BtnInGroupeSaveCancelMui";
import {
 requiredADS,
 teamTypeADS,
 workWidthMusicianTypeADS,
 workingConditionsBD,
} from "./service/createVacancyBD";
import { ControllerPhone } from "../../common/hookFormControllers/ControllerPhone";
import { ControllerEmail } from "../../common/hookFormControllers/ControllerEmail";
import { ControllerWebSite } from "../../common/hookFormControllers/ControllerWebSite";
import { ControllerGender } from "../../common/hookFormControllers/ControllerGender";
import { ControllerWorkExperience } from "../../common/hookFormControllers/ControllerWorkExperience";
import { ControllerGenreAsync } from "../../common/hookFormControllers/ControllerGenreAsync";
import { ControllersCityAsync } from "../../common/hookFormControllers/ControllersCityAsync";
import { ControllerToolsAsync } from "../../common/hookFormControllers/ControllerToolsAsync";
import { ControllerMaster } from "../../common/hookFormControllers/ControllerMaster";
import { ControllerRandomSelect } from "../../common/hookFormControllers/ControllerRandomSelect";
import { ControllerTextField } from "../../common/hookFormControllers/ControllerTextField";
import { ControllerTextArea } from "../../common/hookFormControllers/ControllerTextArea";
import { EnumTypeDocumentType } from "../../types/PROFILE/enum/EnumTypeDocumentType";
import { ControllerAgeRangeRmcPicker } from "../../common/hookFormControllers/ControllerAgeRangeRmcPicker";
import s from "./style/createFormADS.module.scss";
import { ControllersInstitutionTypeAsync } from "../../common/hookFormControllers/ControllersInstitutionTypeAsync";
import { optionsTypeAccount } from "../authorization/service/BD";
import { EnumTypeAccount } from "../../types/PROFILE/enum/EnumTypeAccount";
import { InterfaceGlobalSelectType } from "../../types/interfaseGlobal/interfaseGlobalSelect";

interface CreateFormADSType {
 buttonSubmitText: string;
}

export const CreateFormADS = ({ buttonSubmitText }: CreateFormADSType) => {
 const { control, watch, setValue } = useFormContext();
 const typeAds = watch("required")?.id;

 const team = typeAds === EnumTypeDocumentType.TEAM;
 const mus = typeAds === EnumTypeDocumentType.MUSICIAN;
 const work = typeAds === EnumTypeDocumentType.WORK;

 // const reSelectedOptions = () => {
 //  const obj: InterfaceGlobalSelectType[] = [];

 //  optionsTypeAccount.forEach((x) => {
 //   if (x.id === EnumTypeAccount.MUSICIAN) {
 //    obj.push({ ...x, name: "Работа с музыкантом" });
 //   } else if (x.id !== EnumTypeAccount.MUSIC_LOVER) {
 //    obj.push(x);
 //   }
 //  });

 //  return obj;
 // };

 const watch_questionnaire = watch("who_is_looking_questionnaire")?.id;
 return (
  <>
   <ControllerRandomSelect
    control={control}
    options={requiredADS}
    placeholder="Ищу \ Ищем"
    name="required"
    required={true}
   />
   {team && (
    <ControllerRandomSelect
     control={control}
     placeholder="Вид коллектива"
     name="whoAreLooking"
     options={teamTypeADS}
    />
   )}
   {!!typeAds && (
    <>
     {work && (
      <>
       <ControllerRandomSelect
        name="who_is_looking_questionnaire"
        control={control}
        placeholder="Место работы"
        options={optionsTypeAccount.filter((x) => x.id !== EnumTypeAccount.MUSIC_LOVER)}
       />

       {watch_questionnaire === EnumTypeAccount.MUSICIAN ? (
        <ControllerRandomSelect
         control={control}
         placeholder="Работа с музыкантом"
         name="working_width_musician"
         options={workWidthMusicianTypeADS}
        />
       ) : watch_questionnaire === EnumTypeAccount.TEAM ? (
        <ControllerRandomSelect
         control={control}
         placeholder="Вид коллектива"
         name="teamType"
         options={teamTypeADS}
        />
       ) : watch_questionnaire === EnumTypeAccount.INSTITUTION ? (
        <ControllersInstitutionTypeAsync
         name="typeOfInstitution"
         control={control}
         placeholder="Тип заведения"
        />
       ) : null}
      </>
     )}

     <ControllerToolsAsync
      control={control}
      name="tool"
      placeholder={team ? "Состав" : "Инструмент (род деятельности)"}
      required={mus ? true : false}
     />
     <ControllerGenreAsync control={control} name="genre" required={false} />
     <ControllersCityAsync name="city" placeholder="Город" control={control} setValue={setValue} />
     {mus && (
      <>
       <ControllerGender control={control} name="gender" required={false} />
       <ControllerAgeRangeRmcPicker control={control} watch={watch} />
      </>
     )}

     <div className={s.requirements}>{work ? <h2>О себе</h2> : <h2>Требования</h2>}</div>

     <ControllerWorkExperience
      control={control}
      name="work_experience"
      helperText={`Опишите ${work ? "свой" : "требуемый"} опыт`}
     />
     {!team && <ControllerMaster control={control} name="master" />}

     <ControllerTextArea
      control={control}
      name="commit"
      placeholder={work ? "О себе" : "Требования"}
     />

     <div className={s.requirements}>{work ? <h2>О работе</h2> : <h2>О сотрудничестве</h2>}</div>

     {work && (
      <ControllerTextField
       control={control}
       name="payment"
       placeholder="Оплата"
       helperText="Обязательное поле"
      />
     )}

     {work ? (
      <ControllerRandomSelect
       control={control}
       options={workingConditionsBD}
       placeholder="Условия работы"
       name="workingConditions"
       required={false}
      />
     ) : (
      <ControllerTextArea control={control} name="commitAbout" placeholder="Условия" />
     )}

     {work && (
      <ControllerTextArea control={control} name="commitAbout" placeholder="Описание" /> //Комментарий
     )}

     <div className={s.requirements}>
      <h2>Контакты</h2>
     </div>

     <ControllerPhone control={control} name="phone" />
     <ControllerEmail control={control} name="email" />
     <ControllerWebSite control={control} name="web_site" />

     <div className={s.btnFormWrapper}>
      <BtnInGroupeSaveCancelMui textCancelButton="Назад" textButton={buttonSubmitText} />
     </div>
    </>
   )}
  </>
 );
};
