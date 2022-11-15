import { EducationType } from "../../../modules/user/types/userSliceType";
import s from "./workEducationeCards.module.scss";

interface WorkEducationeCardsType {
 workEducationeData: string | EducationType[];
 skillsCategoryTitle: string;
}

export const WorkEducationeCards = ({
 workEducationeData,
 skillsCategoryTitle,
}: WorkEducationeCardsType) => {
 return (
  <div className={s.skills}>
   <div className={s.profileData}>
    <h2>{skillsCategoryTitle}</h2>

    <div className={s.skills_item}>
     {Array.isArray(workEducationeData) ? (
      workEducationeData.map((item) => {
       return (
        <div
         key={item.period}
         className={s.workEducationeData}
        >
         <div className={s.itemImg}>
          <img src={item.img} alt={item.img} />
         </div>
         <div className={s.text}>
          <p>{item.institution}</p>
          <p>{item.period}</p>
         </div>
        </div>
       );
      })
     ) : !!workEducationeData ? (
      <span className={s.textNotes}>
       {workEducationeData}
      </span>
     ) : (
      <span className={s.textNotes}>Не указан</span>
     )}
    </div>
   </div>
  </div>
 );
};
