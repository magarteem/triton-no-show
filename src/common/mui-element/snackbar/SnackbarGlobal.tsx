import { Alert, AlertProps } from "@mui/material";
import Snackbar from "@mui/material/Snackbar";
import React, { forwardRef } from "react";

export interface StateSnackbarType {
 open: boolean;
 text: string;
 severity: "error" | "info" | "success" | "warning";
}

export interface SnackbarGlobalType {
 text: string;
 severity: "error" | "info" | "success" | "warning";
 open: boolean;
 setOpen: (data: StateSnackbarType) => void;
 autoHideDuration?: number | null;
}

export function SnackbarGlobal({
 text,
 severity,
 open,
 setOpen,
 autoHideDuration = 2000,
}: SnackbarGlobalType) {
 const handleClose = (event: React.SyntheticEvent | Event, reason: string) => {
  if (reason === "clickaway") return;
  setOpen({
   open: false,
   text: "",
   severity: "warning",
  });
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
