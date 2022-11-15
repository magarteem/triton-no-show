import { useRef } from "react";
import {
 FieldValues,
 UseFormRegister,
} from "react-hook-form";
import s from "./uploadPhoto.module.scss";

interface UploadPhotoType {
 register: UseFormRegister<FieldValues>;
 // onChange: () => void;
}
export const UploadPhoto = ({
 register,
}: // onChange,
// ...props
UploadPhotoType) => {
 const filePicker = useRef<HTMLInputElement | null>(null);
 const { ref, ...rest } = register("img_upload");

 const handlePickerRef = () => {
  if (filePicker.current) {
   filePicker.current.click();
  }
 };

 return (
  <div className={s.uploadPhoto}>
   <p onClick={handlePickerRef}>Выбрать файл</p>
   <input
    {...rest}
    type="file"
    ref={(e) => {
     ref(e);
     filePicker.current = e;
    }}
   />
   <span>Размер файла не более 1 мб</span>
  </div>
 );
};
