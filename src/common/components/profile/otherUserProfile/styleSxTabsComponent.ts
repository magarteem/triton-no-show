export const styleSxTabsComponent = {
 tabs: {
  width: "100%",
  borderBottom: "1px solid #E9F0DA;",

  "& .MuiTabs-flexContainer": {
   display: "flex",
   justifyContent: "space-around",

   "& .MuiButtonBase-root": {
    padding: 0,
    fontWeight: 600,
    fontSize: " 14px",
    color: "TabsComponents.colorTitle",

    ["@media (max-width:340px)"]: {
     minWidth: "auto !important",
    },
   },
   "& .MuiButtonBase-root.Mui-selected": {
    color: "TabsComponents.colorTitleActive",
   },
  },

  "& .MuiTabs-indicator": {
   height: "3px",
   background: "#2B6C00",
   borderRadius: "100px 100px 0px 0px",
  },
 },

 tab: {
  textTransform: "none",
 },
};
