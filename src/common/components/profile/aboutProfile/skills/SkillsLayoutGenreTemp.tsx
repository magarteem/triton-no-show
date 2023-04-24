import { memo, useEffect, useRef, useState } from "react";
import { GenreSliceType } from "../../../../../modules/user/types/userSliceType";
import { ElemGenre } from "./ElemGenre";
import cn from "classnames";
import s from "./skillsLayoutGenre.module.scss";

interface SkillsLayoutType {
 skillsDataItem: GenreSliceType[];
 skillsCategoryTitle: string;
}

export const SkillsLayoutGenre = memo(
 ({ skillsDataItem, skillsCategoryTitle }: SkillsLayoutType) => {
  const ref = useRef<HTMLDivElement | null>(null);
  const refSE = useRef<HTMLDivElement | null>(null);
  const [width, setWidth] = useState(0);
  const [chipsW, setchipsW] = useState(0);

  const [showMore, setShowMore] = useState(true);
  const [maxShowChips, setMaxShowChips] = useState(0);

  const toggle = (num: number) => {
   setShowMore((prev) => !prev);
   setMaxShowChips(num);
  };

  useEffect(() => {
   ref.current?.clientWidth && setWidth(ref.current?.clientWidth - 50);
  }, []);

  if (!skillsDataItem?.length) return null;
  let num = 0;

  return (
   <div className={s.skills}>
    <div className={s.profileDataFields}>
     <h2>{skillsCategoryTitle}</h2>

     <div ref={ref} className={s.skills_item}>
      {skillsDataItem.map((item, index) => {
       num = num + chipsW;

       return (
        <ElemGenre
         key={item.name}
         item={item}
         index={index}
         refSE={refSE}
         width={width * 1}
         num={num}
         showMore={showMore}
         setchipsW={setchipsW}
         setMaxShowChips={setMaxShowChips}
        />
       );
      })}

      {skillsDataItem.length > maxShowChips + 1 && (
       <div onClick={() => toggle(skillsDataItem?.length)} className={cn(s.item, s.itemHidden)}>
        Ещё {skillsDataItem.length - maxShowChips - 1}
       </div>
      )}

      {!showMore && (
       <div onClick={() => toggle(30)} className={cn(s.item, s.itemHidden)}>
        Скрыть
       </div>
      )}
     </div>
    </div>
   </div>
  );
 }
);
