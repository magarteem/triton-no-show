import {
 FormControl,
 FormHelperText,
 InputLabel,
 MenuItem,
 OutlinedInput,
 Select,
} from "@mui/material";
import { useEffect, useState } from "react";
import { InterfaceGlobalSelectType } from "../../types/interfaseGlobal/interfaseGlobalSelect";
import { InstrumentGlobalType } from "../../types/PROFILE/InstrumentGlobalType";

interface SelectElementMuiType {
 placeholder: string;
 value?: InterfaceGlobalSelectType | any;
 options: InterfaceGlobalSelectType[] | InstrumentGlobalType[] | any;
 onChange: (e: any) => void;
 isMulti?: boolean;
 errors?: any;
 ItemRef: any;
 required?: boolean;
}
export const SelectElementMui = ({
 placeholder,
 value,
 options,
 isMulti = false,
 onChange,
 errors,
 ItemRef,
 required = false,
 ...props
}: SelectElementMuiType) => {
 const [valueSelect, setValueSelect] = useState<InterfaceGlobalSelectType>(
  //!!value?.id && value
  !!value?.id ? value : null
 );
 const [open, setOpen] = useState(false);

 const set = () => setOpen((prev) => !prev);
 const reSelectGender = (data: InterfaceGlobalSelectType) => {
  setValueSelect((prev) => data);
 };

 useEffect(() => {
  onChange(valueSelect);
 }, [valueSelect]);

 return (
  <FormControl
   focused={open || !!value}
   error={errors}
   fullWidth
   sx={{
    height: "100%",
    "& .MuiFormLabel-root": {
     lineHeight: "inherit",
     color: "TextFieldElementMui.main",

     "& .MuiFormLabel-asterisk": {
      color: "red",
     },
    },
    "& .Mui-focused": {
     color: "TextFieldElementMui.main",
    },
   }}
  >
   <InputLabel
    //shrink={open || !!value}
    required={required}
    id="demo-simple-select-error-label"
    sx={{ color: "TextFieldElementMui.main" }}
   >
    {placeholder}
   </InputLabel>

   <Select
    open={open}
    onOpen={set}
    onClose={set}
    labelId="demo-simple-select-error-label"
    id="demo-simple-select-error"
    error={errors}
    value={value ? value.name : ""}
    input={<OutlinedInput label={placeholder} onChange={onChange} />}
    fullWidth
    MenuProps={{
     sx: {
      ".MuiList-root li": {
       height: "37px !important",
       fontWeight: "700  !important",
       fontSize: "14px",
       color: "#242424 ",
       fontFamily: `Mulish_Regular, sans-serif !important`,
       padding: "0 14px",
       minHeight: "auto !important",

       "& .MuiButtonBase-root": {
        minHeight: "auto !important",
       },
      },
     },
    }}
    sx={{
     height: "100%",
     color: "TextFieldElementMui.main",
     borderRadius: "8px",

     "&.Mui-error .MuiOutlinedInput-notchedOutline": {
      color: "red !important",
      border: "1px solid red !important",
     },

     "& .MuiSvgIcon-root": {
      color: "SelectorElementMui.arrow",
     },

     "& .MuiSelect-select": {
      color: "TextFieldElementMui.main",
      padding: "0 14px",
      fontFamily: `Mulish_Regular, sans-serif !important`,
      fontSize: "16px !important",
      fontWeight: "600 !important",
     },

     fieldset: {
      border: "1px solid #C6D1B8 !important",
      borderRadius: "8px",
     },
    }}
    {...props}
   >
    {options?.map((x: any) => (
     <MenuItem key={x.id} value={x.name} onClick={() => reSelectGender({ id: x.id, name: x.name })}>
      {x.name}
     </MenuItem>
    ))}
   </Select>

   {errors && (
    <FormHelperText
     error={errors}
     sx={{
      position: "absolute",
      bottom: "-18px",
      color: "#ff0000 !important",
     }}
    >
     {errors.message}
    </FormHelperText>
   )}
  </FormControl>
 );
};
