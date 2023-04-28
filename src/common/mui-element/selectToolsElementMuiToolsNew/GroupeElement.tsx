//import React from "react";
import { styleSxTool } from "../selectToolsElementMui/styleSxTool";
import arrowSelect from "../../../assets/icons/arrowSelect.webp";
import { ListItemText } from "@mui/material";
import { InstrumentGlobalType } from "../../../types/PROFILE/InstrumentGlobalType";
import cn from "classnames";
import s from "../optionCustom.module.scss";

interface GroupeElementType {
 x: InstrumentGlobalType;
 index: number;
 classesHiddenCount: number | null;
 setClassesHiddenCount: (index: number | null) => void;
}

export const GroupeElement = ({
 classesHiddenCount,
 index,
 setClassesHiddenCount,
 x,
}: GroupeElementType) => {
 const touchCheck = (e: any, index: number) => {
  console.log("onClick touchCheck index", index);
  classesHiddenCount !== index ? setClassesHiddenCount(index) : setClassesHiddenCount(null);
  e.preventDefault();
 };
 const touchCheckTouch = (e: any, index: number) => {
  console.log("onTouchEnd touchCheckTouch index", index);
  classesHiddenCount !== index ? setClassesHiddenCount(index) : setClassesHiddenCount(null);
  e.preventDefault();
 };

 return (
  <div
   className={s.openMenu}
   onClick={(e) => touchCheck(e, index)}
   onTouchEnd={(e) => touchCheckTouch(e, index)}
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
};
