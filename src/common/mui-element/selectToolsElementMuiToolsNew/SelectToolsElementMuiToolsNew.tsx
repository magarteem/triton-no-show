import arrowSelect from "../../../assets/icons/arrowSelect.webp";
import { ReactComponent as ClearIcon } from "../../../assets/icons/clearIcon.svg";
import hourIcons from "../../../assets/icons/hourIcons.svg";
import {
 Checkbox,
 Chip,
 FormControl,
 FormHelperText,
 InputLabel,
 ListItemText,
 MenuItem,
 OutlinedInput,
 Select,
 SelectChangeEvent,
} from "@mui/material";
import s from "../optionCustom.module.scss";
import cn from "classnames";
import { Stack } from "@mui/system";
import { useEffect, useState } from "react";
import { styleSxTool } from "./styleSxTool";
import { InstrumentGlobalType } from "../../../types/PROFILE/InstrumentGlobalType";
import exportIconsSVG from "../../../assets/icons/iconsTools/exportIconsSVG";
import { ChipsElement } from "./ChipsElement";

interface SelectToolsElementMuiToolsNewType {
 placeholder: string;
 value?: any;
 options: InstrumentGlobalType[];
 onChange: (personName: any) => void;
 errors: any;
 ItemRef: any;
 required?: boolean;
}

export const SelectToolsElementMuiToolsNew = ({
 placeholder,
 value,
 options,
 onChange,
 errors,
 ItemRef,
 required = false,
 ...props
}: SelectToolsElementMuiToolsNewType) => {
 const [classesHiddenCount, setClassesHiddenCount] = useState(0);
 const [personName, setPersonName] = useState<string[]>(value.map((x: any) => x.name));

 const handleChange = (event: SelectChangeEvent<typeof personName>) => {
  const {
   target: { value },
  } = event;
  setPersonName(typeof value === "string" ? value.split(",") : value);
 };

 const handleDelete = (e: any, value: any) => {
  setPersonName(personName.filter((x) => x !== value));
 };

 useEffect(() => {
  let i: any = [];
  options.forEach((x) => {
   if (personName.includes(x.name)) {
    i.push(x);
   } else {
    x.subInstruments.forEach((m) => {
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
  <FormControl fullWidth sx={styleSxTool.formcontrol} error={errors}>
   <InputLabel required={required} id="demo-multiple-checkbox-label" sx={styleSxTool.inputLabel}>
    {placeholder}
   </InputLabel>
   <Select
    //open
    fullWidth
    labelId="demo-multiple-checkbox-label"
    id="demo-multiple-checkbox"
    multiple
    value={personName}
    onChange={handleChange}
    input={<OutlinedInput label={placeholder} />}
    MenuProps={{ sx: styleSxTool.MenuProps }}
    sx={styleSxTool.select}
    renderValue={(selected) => {
     return (
      <Stack direction="row" spacing={1} sx={styleSxTool.stack}>
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
    {/*  */}
    {options.map((x: InstrumentGlobalType, index: number) => {
     let t = 0;

     if (x.subInstruments.length === 0) {
      return (
       <MenuItem sx={styleSxTool.menuItem} key={x.name} value={x.name}>
        <Checkbox sx={styleSxTool.checkbox} checked={personName.indexOf(x.name) > -1} />
        {x.icon && <img alt="icon" src={exportIconsSVG[x.icon]} />}
        <ListItemText primary={x.name} />
       </MenuItem>
      );
     }

     let r = [...x.subInstruments];
     x.subInstruments[0] && r.unshift(x.subInstruments[0]);
     return r.map((p: any) => {
      let iconTools = options.map((op: any) => {
       const temp = op.subInstruments.find((x: any) => x.name === p.name);
       return temp;
      });

      if (t === 0) {
       t++;

       const touchCheck = (e: any, index: number) => {
        setClassesHiddenCount(index);
        //e.stopPropagation();
        e.preventDefault();
       };
       return (
        <div
         className={s.openMenu}
         onTouchStart={(e) => touchCheck(e, index)}
         onTouchEnd={(e) => touchCheck(e, index)}
         onClick={(e) => touchCheck(e, index)}
        >
         <img
          className={cn({
           [s.iconArrow]: index !== classesHiddenCount,
          })}
          src={arrowSelect}
          alt="arrow"
          style={{ marginRight: "10px" }}
         />
         <ListItemText sx={styleSxTool.listItem} primary={x.name} />
        </div>
       );
      } else {
       return (
        <MenuItem
         className={cn({
          [s.optionCustom]: index !== classesHiddenCount,
         })}
         sx={styleSxTool.menuItem}
         key={p.name}
         value={p.name}
        >
         <Checkbox sx={styleSxTool.checkbox} checked={personName.indexOf(p.name) > -1} />
         <img
          alt="icon"
          src={exportIconsSVG[iconTools.filter((y) => y !== undefined)[0].icon] ?? hourIcons}
         />
         <ListItemText primary={p.name} />
        </MenuItem>
       );
      }
     });
    })}
   </Select>
   {errors && (
    <FormHelperText error={errors} sx={styleSxTool.helper}>
     {errors.message}
    </FormHelperText>
   )}
  </FormControl>
 );
};
