import DatePicker, {
 registerLocale,
} from "react-datepicker";
import getYear from "date-fns/getYear";
import getMonth from "date-fns/getYear";
import "react-datepicker/dist/react-datepicker.css";
import ru from "date-fns/locale/ru";
import "./reactDatePickerElement.scss";
import { InputLabel } from "../Input/InputLabel";
registerLocale("ru", ru);

interface ReactDatePickerType {
 placeholder: string;
 value?: any;
 onChange?: (data: any) => any;
 errors?: any;
 ItemRef?: any;
}

export const ReactDatePickerElement = ({
 ItemRef,
 placeholder,
 value,
 onChange,
 errors,
 ...props
}: ReactDatePickerType) => {
 const range = (start: any, end: any) => {
  return new Array(end - start)
   .fill(null)
   .map((d, i) => i + start);
 };
 const years = range(1950, getYear(new Date()));
 const months = [
  "Январь",
  "Февраль",
  "Март",
  "Апрель",
  "Май",
  "Июнь",
  "Июль",
  "Август",
  "Сентябрь",
  "Октябрь",
  "Ноябрь",
  "Декабрь",
 ];
 return (
  <div className="wrapperPicker">
   <DatePicker
    dateFormat="yyyy/MM/dd"
    locale="ru"
    showPopperArrow={false}
    selected={value}
    placeholderText={placeholder}
    //@ts-ignore
    onChange={onChange}
    className={`inputDataPicker ${errors && "errorBorder"}`}
    autoComplete="off"
    popperPlacement="bottom-start"
    renderCustomHeader={({
     date,
     changeYear,
     changeMonth,
    }) => (
     <div
      style={{
       margin: 10,
       display: "flex",
       justifyContent: "center",
      }}
     >
      <select
       value={getYear(date)}
       onChange={({ target: { value } }) =>
        changeYear(+value)
       }
      >
       {years.map((option) => (
        <option key={option} value={option}>
         {option}
        </option>
       ))}
      </select>

      <select
       value={months[getMonth(date)]}
       onChange={({ target: { value } }) =>
        changeMonth(months.indexOf(value))
       }
      >
       {months.map((option) => (
        <option key={option} value={option}>
         {option}
        </option>
       ))}
      </select>
     </div>
    )}
    ref={ItemRef}
    {...props}
   />
   {errors && (
    <span className="error">{errors.message}</span>
   )}
  </div>
 );
};
