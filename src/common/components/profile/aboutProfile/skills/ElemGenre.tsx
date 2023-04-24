import { GenreSliceType } from "../../../../../modules/user/types/userSliceType";
import { useLayoutEffect } from "react";
import s from "./skillsLayoutGenre.module.scss";

interface ElemGenreType {
 item: GenreSliceType;
 refSE: any;
 width: number;
 num: number;
 index: number;
 showMore: boolean;
 setchipsW: (num: number) => void;
 setMaxShowChips: (num: number) => void;
}

export const ElemGenre = ({
 item,
 refSE,
 width,
 num,
 index,
 showMore,
 setchipsW,
 setMaxShowChips,
}: ElemGenreType) => {
 useLayoutEffect(() => {
  if (refSE.current) setchipsW(refSE.current.offsetWidth + 50);
 }, []);

 if (width + width < num && showMore) return null;
 setMaxShowChips(index);

 return (
  <div ref={refSE} style={{ backgroundColor: item.color }} className={s.item} key={item.name}>
   {item.name}
  </div>
 );
};
