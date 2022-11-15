import Select from "react-select";
import {
 //AgeNumberType,
 GroupOptionsType,
 OptionSelectType,
} from "../../../modules/authorization/types/type";
import "./reactSelectElement.scss";

interface ReactSelectElementType {
 placeholder: string;
 value?: any;
 options: OptionSelectType[] | GroupOptionsType[];
 onChange: () => void;
 menuIsOpen?: boolean;
 isMulti?: boolean;
 errors?: any;
 ItemRef: any;
}

//export const ReactSelectElement = forwardRef<any, any>(
export const ReactSelectElement = ({
 placeholder,
 value,
 options,
 isMulti = false,
 onChange,
 menuIsOpen,
 errors,
 ItemRef,
 ...props
}: ReactSelectElementType) => {
 console.log("====");
 console.log("value = ", value);
 const customStyles = {
  container: (provided: any) => ({
   ...provided,
   border: `1.5px solid #E95050`,
  }),
  control: (provided: any) => ({
   ...provided,
   border: `3.5px solid #80ff00`,
  }),
 };

 return (
  <div className="wrapperSelect">
   <Select
    className={`custom_style_container_typeAccount_reg ${
     errors && "styleError"
    }`}
    classNamePrefix="custom_style_list_typeAccount_reg"
    placeholder={placeholder}
    isSearchable={false}
    //onChange={(e: any) => onChange(e)}
    onChange={onChange}
    options={options}
    isMulti={isMulti}
    menuIsOpen={menuIsOpen}
    styles={errors && customStyles}
    value={value}
    ref={ItemRef}
    {...props}
   />
   {errors && (
    <span className="error">{errors.message}</span>
   )}
  </div>
 );
};
