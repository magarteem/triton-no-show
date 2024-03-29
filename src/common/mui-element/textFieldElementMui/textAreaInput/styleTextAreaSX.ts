export const styleTextAreaSX = {
 input: {
  width: "100% !important",
  fontWeight: "700  !important",
  fontSize: "14px",
  color: "#242424 ",
  fontFamily: `Mulish_Regular, sans-serif !important`,
  padding: "0",

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

  "& .MuiInputBase-root": {
   height: "auto",
   borderRadius: "8px",
   padding: "0 14px",
   color: "TextFieldElementMui.main",
   fontFamily: `Mulish_Regular, sans-serif !important`,
   fontSize: "16px !important",
   fontWeight: "600 !important",

   "& .MuiInputBase-input": {
    height: "31px",
    paddingTop: "12px",
    paddingBottom: "5px",
   },

   "&:focus": {
    height: "auto",
   },

   "& .MuiOutlinedInput-notchedOutline": {
    border: "1px solid #C6D1B8 !important",
    borderRadius: "8px",
   },

   "&.Mui-error .MuiOutlinedInput-notchedOutline": {
    color: "red !important",
    border: "1px solid red !important",
   },
  },

  "& .MuiFormHelperText-root": {
   color: "TextFieldElementMui.helperText",
  },
 },
};
