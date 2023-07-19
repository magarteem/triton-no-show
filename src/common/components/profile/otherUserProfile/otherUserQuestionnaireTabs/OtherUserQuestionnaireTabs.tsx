import { useLocation, useOutletContext } from "react-router-dom";
import {
 getMyProfileQuery,
 useGetOtherUserProfileForIDQuery,
} from "../../../../../modules/user/getGetMyProfileQuery";
import { otherUserDataQuery } from "../../../../../modules/user/otherUserDataQuery";
import { RibbonLayout } from "../../../../layout/ribbonLayout/RibbonLayout";
import { QuestionnaireCards } from "../../../ads/questionnaireCards/QuestionnaireCards";
import { PreLoader } from "../../../preLoader/PreLoader";
import { RouteNames } from "../../../../../core/router/RouteNames";
import { useRef } from "react";
import { useSwipeHandleTouch } from "../../../../../hook/useSwipeHandleTouch";
import cn from "classnames";
import s from "../toutchStyleAnimations.module.scss";
import { InButton } from "../../../../ui-elements/button/InButton";

const useGetAllTodoQueryState1 = getMyProfileQuery.endpoints.getOtherUserProfileForID.useQueryState;
const useGetAllTodoQueryState = otherUserDataQuery.endpoints.getByUser.useQueryState;
const useGetAllTodoQuerySubscription = otherUserDataQuery.endpoints.getByUser.useQuerySubscription;

export const OtherUserQuestionnaireTabs = () => {
 let location = useLocation();
 const refs = useRef<HTMLDivElement | null>(null);

 const routL = `${location.pathname.replace(
  RouteNames.OTHER_USER_QUESTIONNAIRE,
  RouteNames.OTHER_USER_ADS
 )}`;
 useSwipeHandleTouch(refs, routL, ``);

 const [id_user]: [string] = useOutletContext();

 const { data: dataQ } = useGetAllTodoQueryState1(id_user);
 useGetOtherUserProfileForIDQuery(id_user, {
  skip: !!dataQ,
 });

 const get_by_user_Id = dataQ ? Object.values(dataQ)[0].tritoneUserId : "";

 const { data, isLoading, isFetching, isSuccess, isError } =
  useGetAllTodoQueryState(get_by_user_Id);
 useGetAllTodoQuerySubscription(get_by_user_Id, { skip: !get_by_user_Id });

 if (isLoading) return <PreLoader />;
 // if (isError) return <InButton textButton="Ошибка запроса" isValidInButton={true} />;

 return (
  <div ref={refs} className={cn(s.hiddenAnimationRight, s.minHeight100)}>
   <RibbonLayout isFetching={isFetching}>
    {!isError ? (
     data?.map((x: any) => <QuestionnaireCards key={x.formId} x={x} />)
    ) : (
     <InButton textButton="Ошибка запроса" isValidInButton={true} />
    )}
   </RibbonLayout>
  </div>
 );
};
