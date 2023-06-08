import { useState, useEffect } from "react";
import { SnackbarGlobal, StateSnackbarType } from "./common/mui-element/snackbar/SnackbarGlobal";
import { AppRouter } from "./core/router/AppRouter";
import ScrollToTop from "./hook/useScrollToTop";
import "./styles/index.scss";

export const App = () => {
 const [openSnackbar, setOpenSnackbar] = useState<StateSnackbarType>({
  open: false,
  text: "",
  severity: "warning",
 });

 useEffect(() => {
  setOpenSnackbar({
   open: process.env.REACT_APP_API_URL_TESTING_STEND === "true" ? true : false,
   text: "Cтенд для тестирования",
   severity: "warning",
  });
 }, []);

 return (
  <div className="App">
   {openSnackbar.open && (
    <SnackbarGlobal
     text={openSnackbar.text}
     open={openSnackbar.open}
     setOpen={setOpenSnackbar}
     severity={openSnackbar.severity}
     autoHideDuration={null}
    />
   )}
   <ScrollToTop />
   <AppRouter />
  </div>
 );
};
