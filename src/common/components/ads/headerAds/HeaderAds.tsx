import { Link } from "react-router-dom";
import { getThisPageURL } from "../../../../helpers/getThisPageURL";
import { useOptionsLongMenu1 } from "../../../../modules/ads/helpers/OptionsLongMenu";
import { ResultAdsTypeResponse } from "../../../../modules/ads/types/responseAdsType";

import { LongMenu } from "../../../mui-element/LongMenu";
import cn from "classnames";
import s from "./headerAds.module.scss";

interface HeaderAdsType {
 x: ResultAdsTypeResponse;
 link: string;
 options?: any;
}

export const HeaderAds = ({ x, link, options }: HeaderAdsType) => {
 const salary = () => {
  if (!x.jobDocument) return x.conditions;
  else return x.jobDocument.conditions;
 };

 return (
  <div className={cn(s.headerAds, { [s.noPayForHeader]: !x.title })}>
   <Link to={link}>
    <div className={cn(s.title, { [s.noPay]: !x.title })}>
     <h2>{x.title ?? "Запрос контактов"}</h2>

     {x.title && (!!salary()?.salary ? <p>{salary()?.salary}</p> : <p>Не коммерческое</p>)}
    </div>
   </Link>

   <div className={s.buttonAction}>
    {/*<LongMenu
     options={[
      {
       label: "Скопировать ссылку",
       link: "",
       action: () => getThisPageURL(),
      },
     ]}
    />*/}
    <LongMenu options={useOptionsLongMenu1(x)} />
    {/*<LongMenu options={options} />*/}
   </div>
  </div>
 );
};

//export const HeaderAds = ({
// x,
// link,
// options,
//}: HeaderAdsType) => {
// // const dispatch = useAppDispatch();

// const looking = [
//  "Музыкант",
//  "Коллектив",
//  "Звукорежиссёр",
// ].indexOf(x.required.name);

// return (
//  <div className={s.headerAds}>
//   <Link to={link}>
//    <div className={s.title}>
//     <h2>
//      {`${looking > -1 ? "Требуется" : "Ищу"}
//Тип
//    ${x.required.name.toLowerCase()}`}
//     </h2>
//     {/*{x. ? (
//      <p>{x.payment}</p>
//     ) : (
//      <p>Не коммерческое</p>
//     )}*/}
//    </div>
//   </Link>

//   <div className={s.buttonAction}>
//    <LongMenu options={options} />
//   </div>
//  </div>
// );
//};
