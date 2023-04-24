import { FilterParamsRequestType } from "../modules/timeLine/types/FilterFormsTimeLineFieldsType";
import { ResponseNewsType } from "../modules/timeLine/types/responseNewsType";

export const rulesQueryInfiniteScroll = (
 previousArg: FilterParamsRequestType | any,
 currentArg: FilterParamsRequestType | any,
 endpointState: any
) => {
 const notDoubleFetch = endpointState?.data as ResponseNewsType;
 // console.log("--------------------------------");
 // console.log("currentArg", currentArg);
 // console.log(" previousArg", previousArg);
 // console.log("notDoubleFetch", notDoubleFetch);
 // console.log("-- >>> ", notDoubleFetch?.isNextPage);

 if (
  notDoubleFetch?.isNextPage &&
  previousArg &&
  currentArg &&
  currentArg !== previousArg &&
  currentArg?.page > previousArg?.page
 ) {
  return true;
 } else return false;
};

//if (
//  previousArg &&
//  currentArg &&
//  currentArg?.page > previousArg?.page &&
//  currentArg?.page < notDoubleFetch?.pageCount
// ) {
//  return true;
// } else return false;
