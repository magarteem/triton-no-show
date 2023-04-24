import { Controller } from "react-hook-form";
import { useGetGenreDataQuery } from "../../api/getDataForForm/getCityQuery";
import { GenreGlobalType } from "../../types/PROFILE/genreGlobalType";
import s from "./formFields.module.scss";
import { SelectGenreElementMuiNew } from "../mui-element/selectGenreElementMuiNew/SelectGenreElementMuiNew";

const reselect = (data: GenreGlobalType[]): GenreGlobalType[] => {
 const dataResult = data.map((x: GenreGlobalType) => {
  return {
   id: x.id,
   name: x.name,
   color: x.color,
   subGenres: x.subGenres,
  };
 });

 return dataResult;
};

export interface ControllerGenreAsyncNewType {
 control: any;
 name: string;
 required?: boolean;
}

export const ControllerGenreAsyncNew = ({
 control,
 name,
 required = true,
}: ControllerGenreAsyncNewType) => {
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
      options={reselect(data)}
      onChange={onChange}
      errors={errors.genre}
      {...field}
     />
    )}
   />
  </div>
 );
};
