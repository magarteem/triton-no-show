import { memo, ReactNode } from "react";
import {
 EducationType,
 OptionsTypeTool,
} from "../../../modules/user/types/userSliceType";
import s from "./skillsLayout.module.scss";

interface SkillsLayoutType {
 skillsDataItem: string | OptionsTypeTool[];
 skillsCategoryTitle: string;
}

export const SkillsLayout = memo(
 ({
  skillsDataItem,
  skillsCategoryTitle,
 }: SkillsLayoutType) => {
  //console.log(skillsCategoryTitle);
  //console.log(skillsDataItem);
  return (
   <div className={s.skills}>
    <div className={s.profileData}>
     {skillsDataItem !== "" && (
      <h2>{skillsCategoryTitle}</h2>
     )}

     <div className={s.skills_item}>
      {Array.isArray(skillsDataItem)
       ? skillsDataItem.map((item) => {
          return (
           <div className={s.item} key={item.label}>
            {item.label}
           </div>
          );
         })
       : skillsDataItem !== "" && (
          <span className={s.textNotes}>
           {skillsDataItem}
          </span>
         )}
     </div>
    </div>
   </div>
  );
 }
);

interface InspirationType {
 inspiration: string[];
 skillsCategoryTitle: string;
}

export const InspirationUser = ({
 skillsCategoryTitle,
 inspiration,
}: InspirationType) => {
 return (
  <div className={s.skills}>
   <div className={s.profileData}>
    <h2>{skillsCategoryTitle}</h2>

    <div className={s.skills_item}>
     <div className={s.containerImg}>
      {inspiration.map((x, index) => (
       <div key={index} className={s.img}>
        <img src={x} alt={x} />
       </div>
      ))}
     </div>
    </div>
   </div>
  </div>
 );
};

interface BtnUserType {
 children: ReactNode;
}

export const BtnUser = ({ children }: BtnUserType) => {
 return <div className={s.btnPosition}>{children}</div>;
};
