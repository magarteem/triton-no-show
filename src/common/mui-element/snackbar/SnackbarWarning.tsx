import { Alert, AlertProps } from "@mui/material";
import Snackbar from "@mui/material/Snackbar";
import React, { forwardRef } from "react";
import { useAppDispatch } from "../../../core/redux/app/hooks";
import { clearError } from "../../../api/errorStoreSlice";

export interface SnackbarWarningType {
 text: string;
 severity: "error" | "info" | "success" | "warning";
 open: boolean;
 autoHideDuration?: number | null;
 setOpen: (set: boolean) => void;
}

export function SnackbarWarning({
 text,
 severity,
 open,
 autoHideDuration = 2000,
 setOpen,
}: SnackbarWarningType) {
 const dispatch = useAppDispatch();
 const handleClose = (event: React.SyntheticEvent | Event, reason: string) => {
  if (reason === "clickaway") return;
  setOpen(false);
  dispatch(clearError());
 };

 return (
  <div>
   <Snackbar
    anchorOrigin={{ vertical: "top", horizontal: "right" }}
    open={open}
    autoHideDuration={autoHideDuration}
    onClose={handleClose}
   >
    {/*//@ts-ignore*/}
    <SnackbarAlert onClose={handleClose} severity={severity}>
     {text}
    </SnackbarAlert>
   </Snackbar>
  </div>
 );
}

const SnackbarAlert = forwardRef<HTMLDivElement, AlertProps>(function SnackbarAlert(props, ref) {
 return <Alert elevation={2} ref={ref} {...props} />;
});
