import {
 Checkbox,
 FormControl,
 FormHelperText,
 InputLabel,
 ListItemText,
 MenuItem,
 OutlinedInput,
 Select,
 SelectChangeEvent,
 Stack,
} from "@mui/material";
import { useEffect, useState } from "react";
import { GenreType } from "../../../modules/authorization/types/authType";
import { styleSxGenre } from "./styleSxGenre";
import { ChipsElement } from "./ChipsElement";
import { GenreGlobalType } from "../../../types/PROFILE/genreGlobalType";
import { styleSxTool } from "../selectToolsElementMuiToolsNew/styleSxTool";
import "./styleGenre.css";
import cn from "classnames";
import { GroupeElement } from "./GroupeElement";

interface SelectGenreElementMuiNewType {
 placeholder: string;
 value: GenreType[];
 options: GenreGlobalType[];
 onChange: (personName: any) => void;
 isMulti?: boolean;
 errors?: any;
 ItemRef: any;
 required?: boolean;
}

export const SelectGenreElementMuiNew = ({
 placeholder,
 value,
 options,
 isMulti = false,
 onChange,
 errors,
 ItemRef,
 required = false,
 ...props
}: SelectGenreElementMuiNewType) => {
 const [classesHiddenCount, setClassesHiddenCount] = useState<number | null>(0);
 const [personName, setPersonName] = useState<string[]>(value.map((x) => x.name));

 const handleChange = (event: SelectChangeEvent<typeof personName>) => {
  const {
   target: { value },
  } = event;
  setPersonName(typeof value === "string" ? value.split(",") : value);
 };

 const handleDelete = (value: any) => {
  setPersonName(personName.filter((x) => x !== value));
 };

 useEffect(() => {
  let i: any = [];
  options.forEach((x) => {
   if (personName.includes(x.name)) {
    i.push(x);
   } else {
    x.subGenres.forEach((m) => {
     if (personName.includes(m.name)) {
      i.push(m);
     }
    });
   }
  });

  onChange(i);
 }, [onChange, options, personName]);

 useEffect(() => {
  !!!value.length && !!personName.length && setPersonName([]);
 }, [value]);

 return (
  <FormControl fullWidth sx={styleSxGenre.formcontrol} error={errors}>
   <InputLabel
    required={required}
    id="demo-multiple-checkbox-label"
    sx={{ color: "#1A1C18 !important" }}
   >
    {placeholder}
   </InputLabel>
   <Select
    fullWidth
    labelId="demo-multiple-checkbox-label"
    id="demo-multiple-checkbox"
    multiple
    value={personName}
    onChange={handleChange}
    input={<OutlinedInput label={placeholder} />}
    MenuProps={{
     sx: styleSxGenre.menuProps,
    }}
    sx={styleSxGenre.select}
    renderValue={(selected) => {
     return (
      <Stack direction="row" spacing={1} sx={styleSxGenre.stack}>
       {selected.map((values: any) => {
        return (
         <ChipsElement
          handleDelete={handleDelete}
          options={options}
          values={values}
          key={values.name}
         />
        );
       })}
      </Stack>
     );
    }}
    {...props}
   >
    {options.map((x: GenreGlobalType, index: number) => {
     let t = 0;

     if (x.subGenres.length === 0) {
      return (
       <MenuItem sx={styleSxTool.menuItem} key={x.name} value={x.name}>
        <Checkbox sx={styleSxTool.checkbox} checked={personName.indexOf(x.name) > -1} />
        <ListItemText primary={x.name} />
       </MenuItem>
      );
     }

     let r = [...x.subGenres];
     x.subGenres[0] && r.unshift(x.subGenres[0]);

     return r.map((p: any) => {
      if (t === 0) {
       t++;

       return (
        <GroupeElement
         key={t}
         x={x}
         index={index}
         classesHiddenCount={classesHiddenCount}
         setClassesHiddenCount={setClassesHiddenCount}
        />
       );
      } else {
       return (
        <MenuItem
         className={cn({
          optionCustom: index !== classesHiddenCount,
         })}
         sx={styleSxTool.menuItem}
         key={p.name}
         value={p.name}
        >
         <Checkbox sx={styleSxTool.checkbox} checked={personName.indexOf(p.name) > -1} />
         <ListItemText primary={p.name} />
        </MenuItem>
       );
      }
     });
    })}
   </Select>
   {errors && (
    <FormHelperText error={errors} sx={styleSxGenre.helper}>
     {errors.message}
    </FormHelperText>
   )}
  </FormControl>
 );
};

//return (
//  <MenuItem key={x.name} value={x.name}>
//   <Checkbox
//    style={{ width: "15px", height: "15px" }}
//    sx={styleSxGenre.checkbox}
//    checked={personName.indexOf(x.name) > -1}
//   />
//   <ListItemText primary={x.name} />
//  </MenuItem>
// );
