import Select from "react-select";
import { optionsTypeAccount } from "../../../../modules/authorization/service/BD";
import "./reactSelect.scss";

interface ReactSelectType {
 onChange: (e: string) => void;
 errors: any;
 value?: any;
 itemRef: any;
}

export const ReactSelect = ({
 errors,
 value,
 itemRef,
 onChange,
 ...props
}: ReactSelectType) => {
 // const val = optionsTypeAccount.filter(
 //  (x) => x.value === valueData
 // );

 console.log(value);
 // console.log(val);
 return (
  <Select
   options={optionsTypeAccount}
   value={value}
   className="custom_style_container_reg"
   placeholder="Выбрать"
   isSearchable={false}
   onChange={(e: any) => onChange(e)}
   classNamePrefix="custom_style_list_reg"
   // menuIsOpen
   ref={itemRef}
   {...props}
  />
 );
};
