import { PreLoader } from "../common/components/preLoader/PreLoader";
import { useLicenseQuery } from "../modules/authorization/authQuery";
import cancelImgIcon from "../assets/icons/arrowBack.svg";
import { FormLayoutCreateADS } from "../common/layout/formLayoutCreateADS/FormLayoutCreateADS";

export const License = () => {
 const { data } = useLicenseQuery();

 return (
  <FormLayoutCreateADS textLabel="Соглашение" arrowCanselImgIcon={cancelImgIcon}>
   {data ? (
    <pre
     style={{
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
