import { useRef } from "react";
import arrowSelect from "../../../../assets/icons/arrowSelect.webp";
import { GroupOptionsType } from "../../../../modules/authorization/types/type";
import s from "./formatGroupLabel.module.scss";

interface FormatGroupLabelType {
 data: GroupOptionsType;
}

export const FormatGroupLabel = ({
 data,
}: FormatGroupLabelType) => {
 const ref = useRef<any>(null);

 const showList = () => {
  let parent = ref.current.parentElement;
  parent.classList.toggle("menuListGroupeOpen");
 };

 return (
  <div
   onClick={showList}
   ref={ref}
   className={s.formatGroupLabel}
  >
   <div className={s.arrowSelectImg}>
    <img src={arrowSelect} alt={arrowSelect} />
   </div>
   <span>{data.label}</span>
  </div>
 );
};
