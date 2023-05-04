import { useState } from "react";
import { useOutletContext } from "react-router-dom";
import { otherUserDataQuery } from "../../../../../modules/user/otherUserDataQuery";
import { RibbonLayout } from "../../../../layout/ribbonLayout/RibbonLayout";
import { InButton } from "../../../../ui-elements/button/InButton";
import { AnnouncementFeed } from "../../../ads/announcementFeed/AnnouncementFeed";
import { PreLoader } from "../../../preLoader/PreLoader";

const useGetAllTodoQueryState = otherUserDataQuery.endpoints.otherUserVacancy.useQueryState;
const useGetAllTodoQuerySubscription =
  otherUserDataQuery.endpoints.otherUserVacancy.useQuerySubscription;

export const OtherUserVacancyTabs = () => {
  const [id_user]: [string] = useOutletContext();

  const [page, setPage] = useState(0);
  const { data, isLoading, isFetching, isSuccess } = useGetAllTodoQueryState({
    formId: id_user,
    page,
  });

  useGetAllTodoQuerySubscription({
    formId: id_user,
    page,
  });

  const setPageFu = () => {
    data && setPage((prev) => data.currentPage + 1);
  };

  if (isLoading) return <PreLoader />;
  if (!isSuccess) return <p>isSuccess</p>;

  return (
    <RibbonLayout setPageFu={setPageFu} isFetching={isFetching}>
      {data.results.length === 0 && (
        <InButton textButton="Нет публикаций" isValidInButton={false} />
      )}

      {data.results.map((x) => (
        <AnnouncementFeed x={x} key={x.id} />
      ))}
    </RibbonLayout>
  );
};
