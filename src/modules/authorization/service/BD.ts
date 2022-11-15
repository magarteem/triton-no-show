import {
 // AgeNumberType,
 GroupOptionsType,
 OptionSelectType,
} from "../types/type";

export const optionsTypeAccount: OptionSelectType[] = [
 { value: "musician", label: "Музыкант" },
 { value: "group-collective", label: "Группа / Коллектив" },
 {
  value: "performance-venue",
  label: "Заведение / Площадка для выступлений",
 },
 { value: "school-of-music", label: "Музыкальная школа" },
 { value: "rehearsal-point", label: "Репетиционная точка" },
 { value: "recording-studio", label: "Студия звукозаписи" },
 { value: "a-music-shop", label: "Музыкальный магазин" },
 {
  value: "Workshop-of-musical instruments",
  label: "Мастерская музыкальных инструментов",
 },
 { value: "sound-engineer", label: "Звукорежиссёр" },
];

export const sityBD: OptionSelectType[] = [
 { value: "lobnya", label: "Лобня" },
 { value: "lysva", label: "Лысьва" },
 { value: "lytkarino", label: "Лыткарино" },
 { value: "lyubertsy", label: "Люберцы" },
 { value: "magadan", label: "Магадан" },
 { value: "magnitogorsk", label: "Магнитогорск" },
 { value: "maykop", label: "Майкоп" },
 { value: "makhachkala", label: "Махачкала" },
 { value: "mezhdurechensk", label: "Междуреченск" },
 { value: "meleuz", label: "Мелеуз" },
];

export const genderBD: OptionSelectType[] = [
 { value: "male", label: "Мужской" },
 { value: "female", label: "Женский" },
 { value: "other", label: "Другое" },
];

export const groupeOptions: GroupOptionsType[] = [
 {
  label: "Вокал",
  isOpen: true,
  options: [
   { label: "Тенор", value: "value_1" },
   { label: "Баритон", value: "value_2" },
   { label: "Бас", value: "value_23" },
   { label: "Сопрано", value: "value_42" },
   { label: "Меццо-сопрано", value: "value_52" },
   { label: "Контральто", value: "value_26" },
  ],
 },
 {
  label: "Клавишные",
  isOpen: false,
  options: [
   { label: "Аккордеон", value: "accordion" },
   { label: "Ксилофон", value: "xylophone" },
   { label: "Орган", value: "organ" },
   { label: "Пианино", value: "piano" },
   { label: "Рояль", value: "rouial" },
  ],
 },
 {
  label: "Духовые",
  isOpen: false,
  options: [
   {
    label: "Саксофон",
    value: "saxophone",
   },
   {
    label: "Труба",
    value: "pipe",
   },
   {
    label: "Тромбон",
    value: "trombone",
   },
   {
    label: "Валторна",
    value: "french_horn",
   },
   {
    label: "Туба",
    value: "tuba",
   },
   {
    label: "Геликон",
    value: "helicon",
   },
   {
    label: "Сузафон",
    value: "sousaphone",
   },
   {
    label: "Флюгельгорн",
    value: "flugelhorn",
   },
   {
    label: "Корнет",
    value: "cornet",
   },
  ],
 },
 {
  label: "Струнные",
  isOpen: false,
  options: [
   {
    label: "Гитара",
    value: "guitar",
   },
   {
    label: "Укулеле",
    value: "ukulele",
   },
   {
    label: "Скрипка",
    value: "violins",
   },
   {
    label: "Альта",
    value: "violas",
   },
   {
    label: "Контрабас",
    value: "вouble_basses",
   },
   {
    label: "Виолончели",
    value: "cellos",
   },
   {
    label: "Домра",
    value: "domry",
   },
   {
    label: "Балалайка",
    value: "balalaikas",
   },
   {
    label: "Гусли",
    value: "gusli",
   },
  ],
 },
];

export const genreBD: OptionSelectType[] = [
 { value: "classical", label: "Классическая" },
 { value: "helicon", label: "Геликон" },
 { value: "folk-narod", label: "Народная" },
 { value: "spiritual", label: "Духовная" },
 { value: "jazz", label: "Джаз" },
 { value: "pop_music", label: "Поп-музыка" },
 { value: "folk", label: "Фолк-музыка" },
 { value: "country", label: "Кантри" },
 { value: "blues", label: "Блюз" },
 { value: "garage blues", label: "Гаражный блюз" },
 { value: "rhythm_and_blues", label: "Ритм-н-блюз" },
 { value: "funk", label: "Фанк" },
];

export const skillBD: OptionSelectType[] = [
 { value: "sofa", label: "Диванный" },
 { value: "newbie", label: "Новичок" },
 { value: "confident", label: "Уверенный" },
 { value: "master", label: "Мастер" },
 { value: "star", label: "Звезда" },
 { value: "teacher", label: "Преподаватель" },
];

export const profilePrivacySettings: OptionSelectType[] = [
 {
  value: "public-questionnaire",
  label: "Публичная анкета",
 },
 {
  value: "partially-open-questionnaire",
  label: "Частично открытая анкета",
 },
 { value: "closed-profile", label: "Закрытая анкета " },
];
