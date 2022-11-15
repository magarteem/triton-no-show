import s from "./textAreaElement.module.scss";

interface TextAreaElementType {
 value: string | any;
 placeholderValue: string;
 onChange: () => void;
 ItemRef: any;
}
export const TextAreaElement = ({
 value,
 placeholderValue,
 onChange,
 ItemRef,
 ...props
}: TextAreaElementType) => {
 return (
  <div className={s.textAreaElement}>
   <textarea
    className={s.textField}
    placeholder={placeholderValue}
    onChange={onChange}
    value={
     typeof value !== "object"
      ? value
      : "Нужен список организаций для выбора"
    }
    ref={ItemRef}
    {...props}
   ></textarea>
  </div>
 );
};
