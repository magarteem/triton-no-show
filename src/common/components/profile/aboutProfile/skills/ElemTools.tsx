import exportIconsSVG from "../../../../../assets/icons/iconsTools/exportIconsSVG";
import { ToolsSliceType } from "../../../../../modules/user/types/userSliceType";
import { useLayoutEffect } from "react";
import s from "./skillsLayoutTools.module.scss";

interface ElemToolsType {
 item: ToolsSliceType;
 refSE: any;
 width: number;
 num: number;
 index: number;
 showMore: boolean;
 setchipsW: (num: number) => void;
 setMaxShowChips: (num: number) => void;
}

export const ElemTools = ({
 item,
 refSE,
 width,
 num,
 index,
 showMore,
 setchipsW,
 setMaxShowChips,
}: ElemToolsType) => {
 useLayoutEffect(() => {
  if (refSE.current) setchipsW(refSE.current.offsetWidth + 50);
 }, []);

 if (width < num && showMore) return null;
 setMaxShowChips(index);

 return (
  <div ref={refSE} className={s.item} key={item.name}>
   <img alt="icon" src={exportIconsSVG[item.icon]} />
   {item.name}
  </div>
 );
};
