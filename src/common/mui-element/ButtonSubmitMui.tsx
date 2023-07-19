import { Button } from "@mui/material";
import { ReactNode, useContext } from "react";
import { ColorModeContext } from "../../contextProvider/MuiThemeContext";

interface ButtonSubmitMuiType {
 textButton: string;
 isValidInButton: boolean;
 startIcon?: string | ReactNode;
 onClick?: () => void;
}

export const ButtonSubmitMui = ({
 textButton,
 isValidInButton,
 onClick,
 startIcon,
 ...props
}: ButtonSubmitMuiType) => {
 const { mode } = useContext(ColorModeContext);

 return (
  <Button
   startIcon={startIcon}
   onClick={onClick}
   disabled={isValidInButton}
   variant="contained"
   type="submit"
   sx={{
    lineHeight: 1,
    background: "linear-gradient(270.95deg, #79AF33 0%, #448016 100%)",
    borderRadius: "100px",
    width: "100%",
    textTransform: "none",
    fontFamily: `Mulish_Regular, sans-serif !important`,

    "&:disabled": {
     color: "Button.disabled",
     boxShadow: "none",
     background: mode === "dark" ? "#e3e3dc1f" : "rgba(0, 0, 0, 0.12)",
    },

    "&:hover": {
     backgroundColor: "#395920",
     borderColor: "#3d5b26",
     boxShadow: "none",
    },

    "&:active": {
     boxShadow: "none",
     backgroundColor: "#2a5708",
     borderColor: "#2a5708",
    },
   }}
   {...props}
  >
   {textButton}
  </Button>
 );
};
