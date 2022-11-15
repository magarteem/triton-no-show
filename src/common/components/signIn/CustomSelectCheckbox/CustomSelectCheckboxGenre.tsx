import { useState } from "react";
import Select, {
 components,
 MultiValueGenericProps,
} from "react-select";
import "./customSelectCheckboxGenre.scss";
import cn from "classnames";

const MultiValueLabel = (props: MultiValueGenericProps) => {
 const Mval = components.MultiValueLabel;
 let obj = props.selectProps.value;
 //@ts-ignore
 const lastItemObj = obj[obj.length - 1].value;
 const count = props.data.value;

 return (
  <Mval {...props}>
   {props.children}
   <span>{lastItemObj !== count && ","}</span>
  </Mval>
 );
};

const Option = (props: any) => {
 const [check, setCheck] = useState<boolean>(
  props.isSelected
 );

 const Co = components.Option;
 return (
  <Co {...props}>
   <div className="customCheckBoxStyleGenre">
    <input
     // checked={props.isSelected}
     defaultChecked={check}
     type="checkbox"
    />
    <span className="check"></span>
    <label className="customLabel">{props.label}</label>
   </div>
  </Co>
 );
};

interface CustomSelectCheckboxGenreType {
 value?: any;
 placeholder: string;
 options: any;
 onChange: (data: string) => void;
 errors: any;
 ItemRef: any;
}
export const CustomSelectCheckboxGenre = ({
 value,
 placeholder,
 options,
 onChange,
 errors,
 ItemRef,
 ...props
}: CustomSelectCheckboxGenreType) => {
 const customStyles = {
  container: (provided: any) =>
   errors && {
    ...provided,
    border: `1.5px solid #E95050`,
   },
  multiValue: (provided: any) => ({
   ...provided,
   background: "inherit",
   fontWeight: 500,
   fotnSize: "16px",
  }),
 };

 return (
  <div className="wrapperSelect">
   <Select
    className={cn("customs_select_container_genre", {
     styleError: errors,
    })}
    classNamePrefix="customs_select_list_prefix_genre"
    placeholder={placeholder}
    isSearchable={false}
    options={options}
    value={value}
    components={{
     Option,
     MultiValueLabel,
    }}
    isMulti
    styles={customStyles}
    onChange={(e: any) => onChange(e)}
    hideSelectedOptions={false}
    closeMenuOnSelect={false}
    isClearable={false}
    theme={(theme) => ({
     ...theme,
     colors: {
      ...theme.colors,
      primary25: "#ffffff",
      primary: "#47c7a921",
     },
    })}
    //menuIsOpen
    ref={ItemRef}
    {...props}
   />
   {errors && (
    <span className="error">{errors.message}</span>
   )}
  </div>
 );
};
