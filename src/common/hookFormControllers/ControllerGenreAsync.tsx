import { Controller } from "react-hook-form";
import { useGetGenreDataQuery } from "../../api/getDataForForm/getCityQuery";
import { SelectGenreElementMuiNew } from "../mui-element/selectGenreElementMuiNew/SelectGenreElementMuiNew";
import s from "./formFields.module.scss";

export interface ControllerGenreAsyncType {
 control: any;
 name: string;
 required?: boolean;
}

export const ControllerGenreAsync = ({
 control,
 name,
 required = true,
}: ControllerGenreAsyncType) => {
 const { data } = useGetGenreDataQuery();

 if (!data) return null;

 return (
  <div className={s.selectFieldCustomHeight}>
   <Controller
    name={name}
    control={control}
    rules={{
     required: required ? "Обязательное поле" : false,
    }}
    render={({ field: { onChange, value, ref, ...field }, formState: { errors } }) => (
     <SelectGenreElementMuiNew
      ItemRef={ref}
      value={value}
      placeholder="Жанр"
      required={required}
      options={data}
      onChange={onChange}
      errors={errors.genre}
      {...field}
     />
    )}
   />
  </div>
 );
};
