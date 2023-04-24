import { useState } from "react";
import { FilterModalLayout } from "../../../layout/filterModalLayout/FilterModalLayout";

interface OpenThisAvatarType {
 avatar: string;
 openModal: boolean;
 setOpenModal: (bool: boolean) => void;
}

export const OpenThisAvatar = ({ avatar, openModal, setOpenModal }: OpenThisAvatarType) => {
 const handleClose = () => setOpenModal(false);

 console.log("avatar", avatar);
 return (
  <FilterModalLayout
   modalOpen={openModal}
   handleClose={handleClose}
   style={{
    "& .MuiDialog-container": {
     "& .MuiPaper-root": {
      background: "none",
      boxShadow: "none",
      width: "100%",
      margin: 0,
      color: "#fff",
      "& .swiper ": {
       width: "100%",

       "& .swiperCardIsOpenning": {
        width: "100% !important",
       },

       img: {
        width: "100% !important",
       },
      },

      "& .swiper-wrapper": {
       alignItems: "center !important",
      },
     },
    },
   }}
  >
   <img src={avatar} alt={avatar} />
  </FilterModalLayout>
 );
};
