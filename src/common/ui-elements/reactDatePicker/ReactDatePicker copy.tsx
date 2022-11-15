import ReactDatePicker, {
 registerLocale,
} from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import ru from "date-fns/locale/ru";
import "./reactDatePickerElement.scss";
registerLocale("ru", ru);

interface ReactDatePickerType {
 placeholder: string;
 value?: any;
 onChange?: (data: any) => any;
 errors?: any;
}

export const ReactDatePickerElement = ({
 placeholder,
 value,
 onChange,
 ...props
}: ReactDatePickerType) => {
 const years = new Date(1990, new Date().getFullYear());
 const months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
 ];

 return (
  <div className="wrapperPicker">
   <ReactDatePicker
    dateFormat="yyyy/MM/dd"
    locale="ru"
    showPopperArrow={false}
    selected={value}
    placeholderText={placeholder}
    //@ts-ignore
    onChange={onChange}
    className="inputDataPicker"
    //customInput={<ExampleCustomInput />}
    autoComplete="off"
    popperPlacement="bottom-start"
    maxDate={new Date()}
    showYearDropdown
    //scrollableMonthYearDropdown
    scrollableYearDropdown
    //filterDate={date=>date.getDate()}
    renderCustomHeader={({
     date,
     changeYear,
     changeMonth,
     decreaseMonth,
     increaseMonth,
     prevMonthButtonDisabled,
     nextMonthButtonDisabled,
     prevYearButtonDisabled,
     nextYearButtonDisabled,
     increaseYear,
     decreaseYear,
    }) => (
     <div
      style={{
       margin: 10,
       display: "flex",
       justifyContent: "center",
      }}
     >
      <button
       onClick={decreaseYear}
       disabled={prevYearButtonDisabled}
      >
       {"<<"}
      </button>
      <button
       onClick={decreaseMonth}
       disabled={prevMonthButtonDisabled}
      >
       {"<"}
      </button>
      <p>
       {months[date.getMonth()]} {date.getFullYear()}
      </p>

      <button
       onClick={increaseMonth}
       disabled={nextMonthButtonDisabled}
      >
       {">"}
      </button>
      <button
       onClick={increaseYear}
       disabled={nextYearButtonDisabled}
      >
       {">>"}
      </button>
     </div>
    )}
    {...props}
   />
  </div>
 );
};
//new Date(t).toLocaleDateString(); => 08.11.2022
