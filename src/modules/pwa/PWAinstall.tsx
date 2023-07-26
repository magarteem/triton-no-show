import React, { useContext, useState } from "react";
import { FilterModalLayout } from "../../common/layout/filterModalLayout/FilterModalLayout";
import { sxStyle } from "../../pages/styles/sx";
import { ColorModeContext } from "../../contextProvider/MuiThemeContext";

export const PWAinstall = () => {
 const { mode } = useContext(ColorModeContext);

 const [open, setOpen] = useState(false);
 const handleClickOpen = () => setOpen(true);
 const handleClose = () => setOpen(false);

 return (
  <FilterModalLayout
   style={{
    ...sxStyle.filterModalLayout,
    "& .MuiPaper-root": {
     background: mode === "dark" ? "#2a2a2a" : "#FDFDF5",
    },
   }}
   modalOpen={open}
   handleClose={handleClose}
  >
   <p>ffdddddddddf</p>
  </FilterModalLayout>
 );
};
