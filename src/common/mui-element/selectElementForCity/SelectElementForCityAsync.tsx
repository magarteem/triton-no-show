import { Autocomplete, CircularProgress, TextField } from "@mui/material";
import React, { ChangeEvent, useEffect, useState, forwardRef } from "react";
import { useGetCityDataAsyncQuery } from "../../../api/getDataForForm/getCityQuery";
import { InterfaceGlobalSelectTypeCity } from "../../../modules/user/types/userSliceType";
import { CityResultsType, CityGlobalType } from "../../../types/PROFILE/cityGlobalType";
import { styleTextFieldSX } from "./styleTextFieldSX";
import { useDebounce } from "../../../hook/useDebiunce";

const reselect = (data: CityGlobalType) => {
 const dataResult = data.results.map((x: CityResultsType) => {
  const stringCity = `${x.title}${x.regionTitle ? ", " + x.regionTitle : ""}${
   x.countryTitle ? ", " + x.countryTitle : ""
  }`;

  return {
   id: x.id,
   name: stringCity,
   metros: x.metros?.length !== 0 ? x.metros : null,
  };
 });

 return dataResult;
};

export interface ParamsCityQuery {
 page: number;
 pageSize: number | undefined;
 query: string;
}

interface SelectElementForCityAsyncType {
 required?: boolean;
 helperText?: string;
 errors?: any;
 inputValue?: InterfaceGlobalSelectTypeCity;
 placeholder: string;
 onChange: (e: ChangeEvent<HTMLInputElement>) => void;
 setValue?: any;
}

export default function SelectElementForCityAsync({
 required = true,
 helperText = "",
 errors,
 inputValue,
 placeholder,
 onChange,
 setValue,
 ...props
}: SelectElementForCityAsyncType) {
 const [query, setQuery] = useState<ParamsCityQuery>({ page: 0, pageSize: 3, query: "" });
 const debouncedValue = useDebounce<ParamsCityQuery>(query, 500);

 const { data, isLoading, isFetching } = useGetCityDataAsyncQuery(debouncedValue);

 useEffect(() => {
  data && setOptions([...reselect(data)]);
  //data && setOptions([...options, ...reselect(data)]);
 }, [data]);

 const [open, setOpen] = useState(false);
 const [options, setOptions] = useState<InterfaceGlobalSelectTypeCity[]>(
  data ? reselect(data) : []
 );

 const loading = isLoading || isFetching;
 // const loading = (open && options.length === 0) || isLoading;

 useEffect(() => {
  let active = true;
  if (!loading) return undefined;

  (async () => {
   if (active) data && setOptions(reselect(data));
  })();

  return () => {
   active = false;
  };
 }, [loading]);

 useEffect(() => {
  //if (!open) setOptions([]);
 }, [open]);

 const asyncFu = async (str: string) => {
  console.log(str);
  setOptions([]);
  setQuery({
   ...query,
   query: str,
  });
 };

 const loadMoreResults = () => console.log("loadMoreResults");
 return (
  <Autocomplete
   ListboxProps={{
    onScroll: (event: React.SyntheticEvent) => {
     const listboxNode = event.currentTarget;
     if (listboxNode.scrollTop + listboxNode.clientHeight === listboxNode.scrollHeight) {
      loadMoreResults();
     }
    },
   }}
   ListboxComponent={(listboxProps) => <ListboxComponent {...listboxProps} />}
   loadingText="Поиск..."
   noOptionsText="Нет результатов"
   onChange={(e, data: any) => {
    setValue("metroId", null);
    return onChange(data);
   }}
   fullWidth
   id="asynchronous-demo"
   open={open}
   onOpen={() => {
    setOpen(true);
   }}
   onClose={() => {
    setOpen(false);
   }}
   value={!!inputValue ? inputValue : null}
   isOptionEqualToValue={(option, value) => option.id === value.id}
   getOptionLabel={(option) => (option.name ? option.name : "")}
   options={options}
   loading={loading}
   renderInput={(params) => (
    <TextField
     onChange={(e) => asyncFu(e.currentTarget.value)}
     helperText={errors && errors.message}
     required={required}
     error={errors}
     sx={styleTextFieldSX.input}
     label={placeholder}
     {...params}
     InputProps={{
      ...params.InputProps,
      endAdornment: (
       <React.Fragment>
        {loading ? <CircularProgress color="inherit" size={20} /> : null}
        {params.InputProps.endAdornment}
       </React.Fragment>
      ),
     }}
    />
   )}
   {...props}
  />
 );
}

const ListboxComponent = forwardRef(function ListboxComponent({ ...rest }, ref: any) {
 return (
  <ul
   ref={ref}
   {...rest}
   // onScroll={({ target }) =>
   //  setIsScrollBottom(target.scrollHeight - target.scrollTop === target.clientHeight)
   // }
  />
 );
});

//https://codesandbox.io/s/jolly-matsumoto-ugs5d?file=/src/Autocomplete.js
