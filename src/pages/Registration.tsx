import { FormProvider, useForm } from "react-hook-form";
import { Outlet, useNavigate } from "react-router-dom";
import { ISignUpFormValues } from "../modules/authorization/types/type";
import { WrapperFullScreen } from "../common/layout/wrapperFullScreen/WrapperFullScreen";
import { RouteNames } from "../common/variables/RouteNames";

export enum FormRegisterFieldNames {
 EMAIL = "email",
 PASSWORD = "password",
 TYPE_ACCOUNT = "type_account",
 NAME_FIELD = "name_field",
 IMG_UPLOAD = "img_upload",
 SITY = "sity",
 GENDER = "gender",
 AGE = "age",
 TOOL = "tool",
 WORK_EXPERIENCE = "work_experience",
 MASTER = "master",
 PRIVATE_SETTINGS = "private_settings",
}

export const Registration = () => {
 const navigate = useNavigate();

 const method = useForm<ISignUpFormValues>({
  mode: "onBlur",
  defaultValues: {
   email: "",
   password: "",
   type_account: null,
   name_field: "",
   img_upload: "",
   sity: null,
   gender: null,
   age: "",
   tool: [],
   genre: [],
   work_experience: "",
   master: null,
   education: "",
   private_settings: null,
  },
 });

 const onSubmit = (data: ISignUpFormValues) => {
  console.log("===");
  console.log(data);
  console.log("===");
  navigate(RouteNames.LOGIN, { replace: true });
 };

 return (
  <WrapperFullScreen>
   <FormProvider {...method}>
    <form onSubmit={method.handleSubmit(onSubmit)}>
     <Outlet />
    </form>
   </FormProvider>
  </WrapperFullScreen>
 );
};
