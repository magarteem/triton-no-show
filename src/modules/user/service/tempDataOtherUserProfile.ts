import Inspiration_1 from "../../../assets/images/Inspiration_1.webp";
import Inspiration_2 from "../../../assets/images/Inspiration_2.webp";
import avatar_1 from "../../../assets/images/avatar_1.webp";
import avatar_2 from "../../../assets/images/avatar_2.webp";
import avatar_3 from "../../../assets/images/avatar_3.webp";
import { InitialStateUserType } from "../types/userSliceType";

export const tempDataOtherUserProfile: InitialStateUserType[] =
 [
  {
   id_user: "initialProfile",
   name: "Юлия Андреевна",
   email: "i-am-mail_test@mail.ru",
   sity: { value: "magadan", label: "Магадан" },
   age: "Thu Aug 11 2010 00:00:00 GMT+0300 (Израиль, летнее время)",
   img_upload: "",
   gender: { value: "female", label: "Женский" },
   type_account: {
    value: "rehearsal-point",
    label: "Репетиционная точка",
   },
   skills: {
    tool: [
     {
      label: "Гитара",
      value: "guitar",
     },
     {
      label: "Укулеле",
      value: "ukulele",
     },
     {
      label: "Саксофон",
      value: "saxophone",
     },
    ],
    genre: [
     {
      label: "Джаз",
      value: "jazz",
     },
     {
      label: "Поп-музыка",
      value: "pop_music",
     },
     {
      label: "Кантри",
      value: "country",
     },
     {
      label: "Блюз",
      value: "blues",
     },
     {
      label: "Фолк-музыка",
      value: "folk",
     },
     {
      label: "Ритм-н-блюз",
      value: "rhythm_and_blues",
     },
    ],
    workExperience:
     "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quis risus, neque cursus risus. Eget dictumst vitae enim, felis morbi. Quis risus, neque cursus risus. Eget dictumst vitae enim, felis morbi. Quis risus, neque cursus risus.",
    master: { value: "newbie", label: "Новичок" },
    education: "Российская Академия музыки им. Гнесеных",
    inspiration: [
     Inspiration_1,
     Inspiration_2,
     Inspiration_1,
    ],
   },
   private_settings: {
    value: "public-questionnaire",
    label: "Публичная анкета",
   },
  },
  {
   id_user: "vova",
   name: "Вова Петров",
   email: "vova_test@mail.ru",
   sity: { value: "lobnya", label: "Лобня" },
   age: "Thu Aug 11 1947 00:00:00 GMT+0300 (Израиль, летнее время)",
   img_upload: "",
   gender: { value: "male", label: "Мужской" },
   type_account: { value: "musician", label: "Музыкант" },
   skills: {
    tool: [
     {
      label: "Гитара",
      value: "guitar",
     },
     {
      label: "Туба",
      value: "tuba",
     },
     {
      label: "Сузафон",
      value: "sousaphone",
     },
    ],
    genre: [
     {
      label: "Поп-музыка",
      value: "pop_music",
     },
     {
      label: "Кантри",
      value: "country",
     },
     {
      label: "Саксофон",
      value: "saxophone",
     },
     {
      label: "Геликон",
      value: "helicon",
     },
    ],
    workExperience: [
     {
      img: avatar_1,
      institution: "Бар “Джаз”",
      period: "2020-2021",
     },
     {
      img: avatar_2,
      institution: "Ресторан “Гармония”",
      period: "2016-2020",
     },
    ],
    master: { value: "master", label: "Мастер" },
    education:
     "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quis risus, neque cursus risus. Eget dictumst vitae enim, felis morbi. Quis risus, neque cursus risus. Eget dictumst vitae enim, felis morbi. Quis risus, neque cursus risus.",
    inspiration: [Inspiration_1, Inspiration_2],
   },
   private_settings: {
    value: "closed-profile",
    label: "Закрытая анкета ",
   },
  },
  {
   id_user: "ulia",
   name: "Юлия Андреевна",
   email: "ulia_test@mail.ru",
   sity: { value: "lyubertsy", label: "Люберцы" },
   age: "Thu Aug 11 1980 00:00:00 GMT+0300 (Израиль, летнее время)",
   img_upload: "",
   gender: { value: "female", label: "Женский" },
   type_account: {
    value: "rehearsal-point",
    label: "Репетиционная точка",
   },
   skills: {
    tool: [
     {
      label: "Гитара",
      value: "guitar",
     },
     {
      label: "Саксофон",
      value: "saxophone",
     },
     {
      label: "Гусли",
      value: "gusli",
     },
    ],
    genre: [
     {
      label: "Поп-музыка",
      value: "pop_music",
     },
     {
      label: "Кантри",
      value: "country",
     },
     {
      label: "Блюз",
      value: "blues",
     },
     {
      label: "Геликон",
      value: "helicon",
     },
     {
      label: "Фолк-музыка",
      value: "folk",
     },
    ],
    workExperience:
     "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quis risus, neque cursus risus. Eget dictumst vitae enim, felis morbi. Quis risus, neque cursus risus. Eget dictumst vitae enim, felis morbi. Quis risus, neque cursus risus.",
    master: { value: "teacher", label: "Преподаватель" },
    education: [
     {
      img: avatar_1,
      institution:
       "Российская Академия музыки им. Гнесеных",
      period: "2017-2019",
     },
     {
      img: avatar_2,
      institution:
       "Национальная Академия музыки им. Шевченко",
      period: "206-2018",
     },
     {
      img: avatar_3,
      institution:
       "Российская Академия музыки им. Гнесеных",
      period: "2016-2019",
     },
    ],
    inspiration: [
     Inspiration_1,
     Inspiration_2,
     Inspiration_1,
    ],
   },
   private_settings: {
    value: "partially-open-questionnaire",
    label: "Частично открытая анкета",
   },
  },
  {
   id_user: "masha",
   name: "Мария Афанасьевна",
   email: "masha_test@mail.ru",
   sity: { value: "makhachkala", label: "Махачкала" },
   age: "Thu Aug 11 1990 00:00:00 GMT+0300 (Израиль, летнее время)",
   img_upload: "",
   gender: { value: "female", label: "Женский" },
   type_account: {
    value: "sound-engineer",
    label: "Звукорежиссёр",
   },

   skills: {
    tool: [
     {
      label: "Гитара",
      value: "guitar",
     },
    ],
    genre: [
     {
      label: "Поп-музыка",
      value: "pop_music",
     },
     {
      label: "Кантри",
      value: "country",
     },
     {
      label: "Фолк-музыка",
      value: "folk",
     },
    ],
    workExperience: [
     {
      img: avatar_1,
      institution: "Бар “Джаз”",
      period: "2010-2021",
     },
     {
      img: avatar_2,
      institution: "Ресторан “Гармония”",
      period: "2016-2020",
     },
     {
      img: avatar_3,
      institution: "Бар “Джаз”",
      period: "2011-2021",
     },
    ],
    master: { value: "newbie", label: "Новичок" },
    education: [
     {
      img: avatar_3,
      institution:
       "Российская Академия музыки им. Гнесеных",
      period: "2018-2019",
     },
     {
      img: avatar_2,
      institution:
       "Национальная Академия музыки им. Шевченко",
      period: "206-2018",
     },
     {
      img: avatar_1,
      institution:
       "Российская Академия музыки им. Гнесеных",
      period: "2016-2019",
     },
    ],
    inspiration: [],
   },
   private_settings: {
    value: "public-questionnaire",
    label: "Публичная анкета",
   },
  },
 ];
