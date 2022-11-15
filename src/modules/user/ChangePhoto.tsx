import { useRef } from "react";
import s from "./style/changePhoto.module.scss";

export const ChangePhoto = () => {
 const filePicker = useRef<HTMLInputElement | null>(null);

 const handlePickerRef = () => {
  if (filePicker.current) {
   filePicker.current.click();
  }
 };

 return (
  <div className={s.uploadPhoto}>
   <p onClick={handlePickerRef}>Изменить фото профиля</p>
   <input
    type="file"
    ref={(e) => {
     filePicker.current = e;
    }}
   />
  </div>
 );
};
