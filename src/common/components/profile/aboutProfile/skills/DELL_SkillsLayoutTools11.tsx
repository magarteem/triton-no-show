import {
 memo,
 useState,
 useLayoutEffect,
 useRef,
 useEffect,
 createElement,
 ReactNode,
 useCallback,
} from "react";
import { ToolsSliceType } from "../../../../../modules/user/types/userSliceType";
import cn from "classnames";
import s from "./skillsLayoutTools.module.scss";
import { calcSizeElementBeforeRender } from "../../../../../helpers/calcSizeElementBeforeRender";

interface SkillsLayoutType {
 skillsDataItem: ToolsSliceType[];
 skillsCategoryTitle: string;
}

export const SkillsLayoutTools = memo(
 ({ skillsDataItem, skillsCategoryTitle }: SkillsLayoutType) => {
  const [data, setData] = useState<ToolsSliceType[]>([]);
  const ref = useRef<HTMLDivElement | null>(null);
  const [showMore, setShowMore] = useState(true);
  const [maxShowChips, setMaxShowChips] = useState(0);
  const [widthMain, setWidth] = useState(0);

  useLayoutEffect(() => {
   setData(skillsDataItem);
   ref.current && setWidth(ref.current.getBoundingClientRect().width);
  }, []);

  useEffect(() => {
   let m: ToolsSliceType[] = [];
   let sizeElements = 0;
   skillsDataItem.forEach((e) => {
    sizeElements = sizeElements + calcSizeElementBeforeRender(e.name) + 70;
    if (ref.current && sizeElements < ref.current.getBoundingClientRect().width * 2) {
     m.push(e);
    }
   });

   setData(m);
  }, [skillsDataItem]);

  let num = 0;
  const toggle = () => {
   setShowMore((prev) => !prev);
   setData(skillsDataItem);
  };

  const fu = (numss: number) => {
   num = num + numss;
   return [num, widthMain * 2];
  };

  return (
   <div className={s.skills}>
    <div className={s.profileDataFields}>
     <h2>{skillsCategoryTitle}</h2>

     <div ref={ref} className={s.skills_item}>
      {/*{data.map((item, index) => {
       return (
        <ToolsTemtToday
         key={index}
         item={item}
         fu={fu}
         index={index}
         setMaxShowChips={setMaxShowChips}
         showMore={showMore}
        />
       );
      })}*/}

      {showMore && skillsDataItem.length - data.length > 0 && (
       <div onClick={toggle} className={cn(s.item, s.itemHidden)}>
        {`Ещё ${skillsDataItem.length - data.length}`}
       </div>
      )}

      {!showMore && (
       <div onClick={toggle} className={cn(s.item, s.itemHidden)}>
        Скрыть
       </div>
      )}
     </div>
    </div>
   </div>
  );
 }
);
