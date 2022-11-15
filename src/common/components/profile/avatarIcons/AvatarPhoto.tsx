import s from "./avatarPhoto.module.scss";

interface AvatarIconsType {
 avatarPhoto: string;
}

export const AvatarPhoto = ({
 avatarPhoto,
}: AvatarIconsType) => {
 return (
  <div className={s.infoAccount}>
   <div className={s.photo}>
    <div className={s.wrapperPhoto}>
     <img src={avatarPhoto} alt="avatar" />
    </div>
   </div>
  </div>
 );
};
