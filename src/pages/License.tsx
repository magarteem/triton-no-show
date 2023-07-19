import { useContext } from "react";
import { PreLoader } from "../common/components/preLoader/PreLoader";
import { useLicenseQuery } from "../modules/authorization/authQuery";
import cancelImgIcon from "../assets/icons/arrowBack.svg";
import { FormLayoutCreateADS } from "../common/layout/formLayoutCreateADS/FormLayoutCreateADS";
import { ColorModeContext } from "../contextProvider/MuiThemeContext";

export const License = () => {
 const { mode } = useContext(ColorModeContext);
 const { data } = useLicenseQuery();

 return (
  <FormLayoutCreateADS textLabel="Соглашение" arrowCanselImgIcon={cancelImgIcon}>
   {data ? (
    <pre
     style={{
      color: mode === "dark" ? "#f5f4f3" : "#43483e",
      whiteSpace: "pre-wrap",
      paddingBottom: "30px",
      wordBreak: "break-word",
     }}
     dangerouslySetInnerHTML={{ __html: data.body }}
    />
   ) : (
    <PreLoader />
   )}
  </FormLayoutCreateADS>
 );
};
