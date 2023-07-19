import { useEffect, useState } from "react";
import { errorCodeResponse } from "../../../api/errorCodeResponse";
import { InitialStateErrorStoreSliceType } from "../../../api/errorStoreSlice";
import { SnackbarWarning } from "../../mui-element/snackbar/SnackbarWarning";

interface ErrorNotificationType extends InitialStateErrorStoreSliceType {
 autoHideDuration?: number | null;
}

export const ErrorNotification = ({
 checkError,
 errStatus,
 autoHideDuration,
}: ErrorNotificationType) => {
 const [open, setOpen] = useState(checkError);

 useEffect(() => {
  checkError && setOpen(checkError);
 }, [checkError]);

 const typeErrorCode = () => {
  if (typeof errStatus === "string") return errStatus;
  if (typeof errStatus === "number") return errorCodeResponse(errStatus);
  else return "Не известная ошибка 11";
 };

 return (
  <>
   {checkError && (
    <SnackbarWarning
     //@ts-ignore
     text={typeErrorCode()}
     open={open}
     setOpen={setOpen}
     severity={"error"}
     autoHideDuration={autoHideDuration}
    />
   )}
  </>
 );
};
