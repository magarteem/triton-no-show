import React from "react";
import { styleSxTool } from "../selectToolsElementMui/styleSxTool";
import arrowSelect from "../../../assets/icons/arrowSelect.webp";
import s from "../optionCustom.module.scss";
import cn from "classnames";
import { ListItemText } from "@mui/material";

interface TestType {
 classesHiddenCount: any;
 setClassesHiddenCount: any;
 index: any;
 x: any;
}

export const Test = ({ classesHiddenCount, index, setClassesHiddenCount, x }: TestType) => {
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
