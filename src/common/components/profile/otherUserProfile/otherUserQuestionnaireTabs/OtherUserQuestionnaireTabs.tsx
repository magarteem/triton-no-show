import { useOutletContext } from "react-router-dom";
import {
  getMyProfileQuery,
  useGetOtherUserProfileForIDQuery,
} from "../../../../../modules/user/getGetMyProfileQuery";
import { otherUserDataQuery } from "../../../../../modules/user/otherUserDataQuery";
import { RibbonLayout } from "../../../../layout/ribbonLayout/RibbonLayout";
import { QuestionnaireCards } from "../../../ads/questionnaireCards/QuestionnaireCards";
import { PreLoader } from "../../../preLoader/PreLoader";

const useGetAllTodoQueryState1 = getMyProfileQuery.endpoints.getOtherUserProfileForID.useQueryState;
const useGetAllTodoQueryState = otherUserDataQuery.endpoints.getByUser.useQueryState;
const useGetAllTodoQuerySubscription = otherUserDataQuery.endpoints.getByUser.useQuerySubscription;

export const OtherUserQuestionnaireTabs = () => {
  const [id_user]: [string] = useOutletContext();

  const { data: dataQ } = useGetAllTodoQueryState1(id_user);
  useGetOtherUserProfileForIDQuery(id_user, {
    skip: !!dataQ,
  });

  const get_by_user_Id = dataQ ? Object.values(dataQ)[0].tritoneUserId : "";

  const { data, isLoading, isFetching, isSuccess } = useGetAllTodoQueryState(get_by_user_Id);
  useGetAllTodoQuerySubscription(get_by_user_Id, { skip: !get_by_user_Id });

  if (isLoading) return <PreLoader />;
  if (!isSuccess) return <PreLoader />;

  return (
    <RibbonLayout isFetching={isFetching}>
      {data.map((x: any) => (
        <QuestionnaireCards key={x.formId} x={x} />
      ))}
    </RibbonLayout>
  );
};
