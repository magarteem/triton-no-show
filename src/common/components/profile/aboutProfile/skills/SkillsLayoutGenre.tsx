import cn from "classnames";
import { memo, useEffect, useRef, useState } from "react";
import { GenreSliceType } from "../../../../../modules/user/types/userSliceType";
import s from "./skillsLayoutGenre.module.scss";
import { calcSizeElementBeforeRender } from "../../../../../helpers/calcSizeElementBeforeRender";

interface SkillsLayoutType {
 skillsDataItem: GenreSliceType[];
 skillsCategoryTitle: string;
}

export const SkillsLayoutGenre = memo(
 ({ skillsDataItem, skillsCategoryTitle }: SkillsLayoutType) => {
  const ref = useRef<HTMLDivElement | null>(null);
  const [showMore, setShowMore] = useState(false);
  const [data, setData] = useState<GenreSliceType[]>([]);
  const [maxShowChips, setMaxShowChips] = useState(0);

  const toggle = (num: number) => {
   setShowMore((prev) => !prev);
   showMore ? setMaxShowChips(num) : setMaxShowChips(skillsDataItem.length);
  };

  const num = () => {
   let m: GenreSliceType[] = [];
   let sizeElements = 0;
   skillsDataItem.forEach((e) => {
    sizeElements = sizeElements + calcSizeElementBeforeRender(e.name) + 40;
    if (ref.current && sizeElements < ref.current.getBoundingClientRect().width * 2) {
     m.push(e);
    }
   });
   return m.length;
  };

  useEffect(() => {
   setShowMore(false);
   setMaxShowChips(num());
  }, [skillsDataItem]);

  useEffect(() => {
   setData(skillsDataItem.slice(0, maxShowChips));
  }, [maxShowChips]);

  return (
   <div className={s.skills}>
    <div className={s.profileDataFields}>
     <h2>{skillsCategoryTitle}</h2>

     <div ref={ref} className={s.skills_item}>
      {data.map((item, index) => (
       <div style={{ backgroundColor: item.color }} className={s.item} key={item.name}>
        {item.name}
       </div>
      ))}

      {!showMore && skillsDataItem?.length > maxShowChips && (
       <div onClick={() => toggle(skillsDataItem.length)} className={cn(s.item, s.itemHidden)}>
        Ещё {skillsDataItem.length - maxShowChips}
       </div>
      )}

      {showMore && data.length === skillsDataItem.length && (
       <div onClick={() => toggle(num())} className={cn(s.item, s.itemHidden)}>
        Скрыть
       </div>
      )}
     </div>
    </div>
   </div>
  );
 }
);
