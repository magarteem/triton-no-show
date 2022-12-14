import { Controller, useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { BtnInFormSaveCancel } from "../../common/components/navigateButton/BtnInFormSaveCancel";
import { CustomSelectCheckboxGenre } from "../../common/components/signIn/CustomSelectCheckbox/CustomSelectCheckboxGenre";
import { CustomSelectCheckboxTools } from "../../common/components/signIn/CustomSelectCheckbox/CustomSelectCheckboxTools";
import { Input } from "../../common/ui-elements/Input/Input";
import { InputLabel } from "../../common/ui-elements/Input/InputLabel";
import { ReactSelectElement } from "../../common/ui-elements/react-select/ReactSelectElement";
import { ReactDatePickerElement } from "../../common/ui-elements/reactDatePicker/ReactDatePicker";
import { TextAreaElement } from "../../common/ui-elements/textarea/TextAreaElement";
import { useAppDispatch } from "../../core/redux/app/hooks";
import {
 genderBD,
 genreBD,
 groupeOptions,
 profilePrivacySettings,
 sityBD,
 skillBD,
} from "../authorization/service/BD";
import { ISignUpFormValues } from "../authorization/types/type";
import { changeProfileThunk } from "./changeProfileThunk";
import s from "./style/formChangeProfile.module.scss";
import {
 ChangeProfileFormValues,
 InitialStateUserType,
} from "./types/userSliceType";

interface FormChangeProfileType {
 userDataProfile: InitialStateUserType;
}
export const FormChangeProfile = ({
 userDataProfile,
}: FormChangeProfileType) => {
 const dispatch = useAppDispatch();
 const navigate = useNavigate();

 const {
  name,
  sity,
  age,
  gender,
  skills,
  private_settings,
 } = userDataProfile;
 console.log("userDataProfile = ", age);

 const {
  control,
  handleSubmit,
  reset,
  formState: { errors },
 } = useForm<ISignUpFormValues>({
  mode: "all",
  defaultValues: {
   name_field: name,
   sity,
   gender,
   age: new Date(age).getTime(),
   tool: skills.tool,
   genre: skills.genre,
   work_experience: skills.workExperience,
   master: skills.master,
   education: skills.education,
   private_settings,
  },
 });
 console.log(age);
 const onSubmit = (data: ChangeProfileFormValues) => {
  console.log(data);
  dispatch(changeProfileThunk(data));
  navigate(-1);
 };

 return (
  <form
   onSubmit={handleSubmit(onSubmit)}
   className={s.forms}
  >
   {/*  */}
   <div className={s.styleInput}>
    <Controller
     name="name_field"
     control={control}
     rules={{
      required: "???????????????????????? ????????",
      minLength: {
       value: 3,
       message: "???? ?????????? 3?? ????????????????",
      },
     }}
     render={({
      field: { onChange, value, ref, ...field },
     }) => (
      <>
       <InputLabel titleSelect="??????" required />
       <Input
        inputValue={value}
        placeholder="?????????????????? ?????????????????? "
        onChange={onChange}
        errors={
         errors.name_field && errors.name_field.message
        }
        {...field}
       />
      </>
     )}
    />
   </div>

   <div className={s.selectField}>
    <InputLabel titleSelect="??????????" required />
    <Controller
     name="sity"
     control={control}
     rules={{
      required: "???????????????????????? ????????",
     }}
     render={({
      field: { onChange, value, ref, ...field },
      fieldState: { error },
     }) => (
      <ReactSelectElement
       value={value}
       ItemRef={ref}
       placeholder="??????????????"
       options={sityBD}
       onChange={onChange}
       errors={errors.sity}
       {...field}
      />
     )}
    />
   </div>

   <div className={s.selectField}>
    <InputLabel titleSelect="??????" required />
    <Controller
     name="gender"
     control={control}
     rules={{
      required: "???????????????????????? ????????",
     }}
     render={({
      field: { onChange, value, ref, ...field },
     }) => (
      <ReactSelectElement
       ItemRef={ref}
       value={value}
       placeholder="??????????????"
       options={genderBD}
       onChange={onChange}
       errors={errors.gender}
       {...field}
      />
     )}
    />
   </div>

   <div className={s.selectField}>
    <InputLabel titleSelect="??????????????" required />
    <Controller
     name="age"
     control={control}
     rules={{
      required: "???????????????????????? ????????",
     }}
     render={({
      field: { onChange, value, ref, ...field },
     }) => (
      <ReactDatePickerElement
       ItemRef={ref}
       placeholder="???????? ????????????????"
       value={value}
       onChange={onChange}
       errors={errors.age}
       {...field}
      />
     )}
    />
   </div>

   <div className={s.selectField}>
    <InputLabel
     titleSelect="???????????????????? (?????? ????????????????????????)"
     required
    />
    <Controller
     name="tool"
     control={control}
     rules={{
      required: "???????????????????????? ????????",
     }}
     render={({
      field: { onChange, ref, value, ...field },
     }) => (
      <CustomSelectCheckboxTools
       ItemRef={ref}
       value={value}
       placeholder="??????????????"
       options={groupeOptions}
       onChange={onChange}
       errors={errors.tool}
       {...field}
      />
     )}
    />
   </div>

   <div className={s.selectField}>
    <InputLabel titleSelect="????????" required />
    <Controller
     name="genre"
     control={control}
     rules={{
      required: "???????????????????????? ????????",
     }}
     render={({
      field: { onChange, value, ref, ...field },
     }) => (
      <CustomSelectCheckboxGenre
       ItemRef={ref}
       value={value}
       placeholder="??????????????"
       options={genreBD}
       onChange={onChange}
       errors={errors.genre}
       {...field}
      />
      //<ReactSelectElement
      // placeholder="??????????????"
      // options={genreBD}
      // onChange={onChange}
      // isMulti
      // errors={errors.genre}
      // {...field}
      ///>
     )}
    />
   </div>

   <div className={s.styleInput}>
    <InputLabel titleSelect="???????? ????????????/??????????????????????" />
    <Controller
     name="work_experience"
     control={control}
     render={({
      field: { onChange, value, ref, ...field },
     }) => (
      <div className={s.textarea}>
       <TextAreaElement
        ItemRef={ref}
        value={value}
        onChange={onChange}
        placeholderValue="??????????????"
        {...field}
       />
       <span className={s.notes}>?????????????? ?????? ????????</span>
      </div>
     )}
    />
   </div>

   <div className={s.selectField}>
    <InputLabel titleSelect="????????????????????" />
    <Controller
     name="master"
     control={control}
     render={({
      field: { onChange, value, ref, ...field },
     }) => (
      <ReactSelectElement
       ItemRef={ref}
       value={value}
       placeholder="??????????????"
       options={skillBD}
       onChange={onChange}
       {...field}
      />
     )}
    />
   </div>

   <div className={s.styleInput}>
    <InputLabel titleSelect="??????????????????????" />
    <Controller
     name="education"
     control={control}
     render={({
      field: { onChange, value, ref, ...field },
     }) => (
      <div className={s.textarea}>
       <TextAreaElement
        ItemRef={ref}
        value={value}
        onChange={onChange}
        placeholderValue="??????????????"
        {...field}
       />
      </div>
     )}
    />
   </div>

   <div className={s.selectField}>
    <InputLabel titleSelect="?????????????????? ?????????????????????? ????????????" />
    <Controller
     name="private_settings"
     control={control}
     rules={{
      required: "???????????????????????? ????????",
     }}
     render={({ field: { onChange, ref, ...field } }) => (
      <ReactSelectElement
       ItemRef={ref}
       placeholder="??????????????"
       options={profilePrivacySettings}
       errors={errors.private_settings}
       onChange={onChange}
       {...field}
      />
     )}
    />
   </div>

   <div className={s.btnFormWrapper}>
    <BtnInFormSaveCancel
     textCancelButton="????????????"
     textButton="C????????????????"
    />
   </div>
  </form>
 );
};
