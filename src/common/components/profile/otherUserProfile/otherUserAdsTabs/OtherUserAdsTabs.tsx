import { useState } from "react";
import { useOutletContext } from "react-router-dom";
import { InitialStateAdsType } from "../../../../../modules/ads/types/adsSliceType";
import { InitialStateTeamLineType } from "../../../../../modules/timeLine/types/timlineSliceType";
import { otherUserDataQuery } from "../../../../../modules/user/otherUserDataQuery";
import { InitialStateUserType } from "../../../../../modules/user/types/userSliceType";
import { RibbonLayout } from "../../../../layout/ribbonLayout/RibbonLayout";
import { InButton } from "../../../../ui-elements/button/InButton";
import { AnnouncementFeed } from "../../../ads/announcementFeed/AnnouncementFeed";
import { AnnouncementFeedInNotification } from "../../../notification/announcementFeedInNotification/AnnouncementFeedInNotification";
import { PreLoader } from "../../../preLoader/PreLoader";

const useGetAllTodoQueryState = otherUserDataQuery.endpoints.otherUserAnnouncement.useQueryState;
const useGetAllTodoQuerySubscription =
 otherUserDataQuery.endpoints.otherUserAnnouncement.useQuerySubscription;

export const OtherUserAdsTabs = () => {
 const [adsNews, dataAdsList, profile, id_user]: [
  InitialStateTeamLineType,
  InitialStateAdsType,
  InitialStateUserType,
  string
 ] = useOutletContext();

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
   {data.results.length === 0 && <InButton textButton="Нет публикаций" isValidInButton={false} />}

   {data.results.map((x) => (
    <AnnouncementFeed x={x} profile={profile} key={x.id} />
    //<AnnouncementFeedInNotification
    // x={x}
    // profile={profile}
    // key={x.id}
    ///>
   ))}
  </RibbonLayout>
 );
};
