export const styleSxGenre = {
 formcontrol: {
  "& .MuiFormLabel-root": {
   lineHeight: "inherit",
   color: "TextFieldElementMui.main",

   "& .MuiFormLabel-asterisk": {
    color: "red",
   },
  },
  "& .Mui-focused": {
   color: "TextFieldElementMui.main",
  },
 },

 menuProps: {
  "& .MuiPaper-root": {
   padding: "10px 16px !important",
   height: "75vh",
  },

  ".MuiList-root li": {
   transition: "all 0.2s",
   height: "37px",
   padding: "0 14px",
   minHeight: "auto !important",

   "&.Mui-selected": {
    background: "#4dd64d2e",
   },

   "& .MuiListItemText-root .MuiTypography-root": {
    lineHeight: "1 !important",
    paddingLeft: "6px",
    fontWeight: "700  !important",
    fontSize: "14px",
    color: "Filter.placeholder",
    fontFamily: `Mulish_Regular, sans-serif !important`,
   },
  },
 },

 select: {
  minHeight: "48px !important",
  borderRadius: "8px",

  "&.Mui-error .MuiOutlinedInput-notchedOutline": {
   color: "red !important",
   border: "1px solid red !important",
  },

  "& .MuiSvgIcon-root": {
   color: "SelectorElementMui.arrow",
  },

  "& .MuiSelect-select": {
   height: "100% !important",
   padding: "8px 24px 8px 14px !important",

   "&  div": {
    display: "flew",
    flexWrap: "wrap",
    gap: "4px",
   },
  },

  fieldset: {
   border: "1px solid #C6D1B8 !important",
   borderRadius: "8px",
  },
  "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
   border: "1px solid #C6D1B8 !important",
  },
 },

 stack: {
  display: "flex !important",
  flexWrap: "wrap !important",

  "@media (max-width: 400px)": {
   gap: "3px 2px !important",
  },
 },

 chip: {
  display: "flex !important",
  alignItems: "center !important",
  border: "1px solid #66784E",
  background: "linear-gradient(0deg, rgba(43, 108, 0, 0.08), rgba(43, 108, 0, 0.08)), #FDFDF5;",
  boxShadow: "0px 1px 2px rgba(0, 0, 0, 0.3), 0px 1px 3px 1px rgba(0, 0, 0, 0.15)",
  borderRadius: " 30px",
  color: "TextFieldElementMui.main",
  fontSize: "14px",
  margin: "0 !important",

  "& .MuiChip-deleteIcon": {
   display: "flex",
   alignItems: "center",
   height: "10px !important",
   svg: {
    width: "14px",
    stroke: "black",
    path: {
     fill: "black",
    },
   },
  },
  "& .MuiChip-label": {
   padding: "3px 8px !important",
  },
 },

 checkbox: {
  padding: "0",
  "& .MuiSvgIcon-root": {
   width: "20px !important",
   height: "20px !important",
   borderRadius: "20px !important",
   color: "#727471",
  },

  "&.Mui-checked": {
   svg: {
    color: "#FF5A13",
   },
  },
 },

 helper: {
  position: "absolute",
  bottom: "-18px",
  color: "#ff0000 !important",
 },

 listItem: {
  "& .MuiTypography-root": {
   fontWeight: 600,
  },
 },
};
