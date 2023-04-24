import { useLayoutEffect, useRef } from "react";
import { ToolsSliceType } from "../../../../../modules/user/types/userSliceType";
import exportIconsSVG from "../../../../../assets/icons/iconsTools/exportIconsSVG";
import cn from "classnames";
import s from "./skillsLayoutTools.module.scss";

interface ToolsTemtTodayType {
 item: ToolsSliceType;
 fu: (numss: number) => void;
 setMaxShowChips: (numss: number) => void;
 index: number;
 showMore: boolean;
}

export const ToolsTemtToday = ({
 item,
 fu,
 setMaxShowChips,
 showMore,
 index,
}: ToolsTemtTodayType) => {
 const refSE = useRef<HTMLDivElement | null>(null);
 let refItem: number[] | any =
  refSE.current && fu(refSE.current.getBoundingClientRect().width + 38);

 setMaxShowChips(index);

 const check = refItem && refItem[0] > refItem[1];
 if (showMore && check) return null;

 return (
  <div ref={refSE} className={s.item} key={item.name}>
   <img alt="icon" src={exportIconsSVG[item.icon]} />
   {item.name}
  </div>
 );
};
