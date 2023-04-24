import { Chip } from "@mui/material";
import hourIcons from "../../../assets/icons/hourIcons.svg";
import { ReactComponent as ClearIcon } from "../../../assets/icons/clearIcon.svg";
import exportIconsSVG from "../../../assets/icons/iconsTools/exportIconsSVG";
import { styleSxTool } from "./styleSxTool";
import {
 InstrumentGlobalType,
 ToolsGroupeItemType,
} from "../../../types/PROFILE/InstrumentGlobalType";

interface ChipsElementType {
 handleDelete: (e: any, value: any) => any;
 values: any;
 options: InstrumentGlobalType[];
}

export const ChipsElement = ({ handleDelete, values, options }: ChipsElementType) => {
 const iconTools = (): ToolsGroupeItemType | null => {
  let y = null;
  options.find((op: InstrumentGlobalType) => {
   if (op.subInstruments.length === 0 && op.name === values && op.icon) y = op;
   else {
    return op.subInstruments.find((x: any) => {
     if (x.name === values) y = x;
    });
   }
  });

  return y;
 };

 return (
  <Chip
   deleteIcon={
    <span
     onMouseDown={(event) => {
      event.stopPropagation();
     }}
    >
     <ClearIcon />
    </span>
   }
   onDelete={(e) => handleDelete(e, values)}
   key={values}
   label={values}
   avatar={
    //@ts-ignore
    <img alt="icon" src={exportIconsSVG[iconTools().icon] ?? hourIcons} />
   }
   sx={styleSxTool.chip}
  />
 );
};
