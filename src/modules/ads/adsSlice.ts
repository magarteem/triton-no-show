import { createSlice } from '@reduxjs/toolkit';
import imgTest1 from '../../assets/images/imgTest1.webp';
import imgTest2 from '../../assets/images/imgTest2.webp';
import imgTest3 from '../../assets/images/imgTest3.webp';
import imgTest4 from '../../assets/images/imgTest4.webp';
import imgTest5 from '../../assets/images/imgTest5.webp';
import imgTest6 from '../../assets/images/imgTest6.webp';
import imgTest7 from '../../assets/images/imgTest7.webp';
import imgTest8 from '../../assets/images/imgTest8.webp';
import imgTest9 from '../../assets/images/imgTest9.webp';
import imgTest10 from '../../assets/images/imgTest10.webp';
import calendar from '../../assets/images/calendar.webp';
import news from '../../assets/images/news.webp';
import people1 from '../../assets/images/people1.webp';
import people2 from '../../assets/images/people2.webp';
import smiley from '../../assets/images/smiley.webp';
import { InitialStateAdsType } from '../../core/redux/types/adsSliceType';

const adsCardsData = [
  {
    avatar: people1,
    name: 'Мария Басманова',
    timeAgo: '12 мин. назад',
    photo: [],
    title: 'Гитарист в группу',
    skills: ['Гитара', 'Скрипка'],
    textAbout: 'Описание в две три строки, что нужно делать, кто еще в группе',
  },
  {
    avatar: '',
    name: 'Константин Иванов',
    timeAgo: '2 часа назад',
    photo: [],
    title: 'Вокалист в караоке',
    skills: ['Гитара', 'Скрипка'],
    textAbout: 'Описание в две три строки, что нужно делать, кто еще в группе',
  },
  {
    avatar: people2,
    name: 'Репетиционная база ЭРТВ-1',
    timeAgo: '12 мин. назад',
    photo: [
      imgTest6,
      imgTest10,
      imgTest7,
      imgTest9,
      imgTest5,
      imgTest8,
      imgTest1,
    ],
    title: 'Шесть площадок',
    skills: ['Гитара', 'Скрипка'],
    textAbout: 'Описание в две три строки, что нужно делать, кто еще в группе',
  },
  {
    avatar: '',
    name: 'Репетиционная база ЭРТВ-2',
    timeAgo: '38 мин. назад',
    photo: [
      imgTest6,
      imgTest5,
      imgTest4,
      imgTest10,
      imgTest7,
      imgTest9,
      imgTest3,
      imgTest8,
      imgTest2,
      imgTest1,
    ],
    title: 'Шесть площадок',
    skills: ['Гитара', 'Скрипка'],
    textAbout: 'Описание в две три строки, что нужно делать, кто еще в группе',
  },
];

const swiperData = [
  {
    text: 'Актуальная новость',
    urlImg: news,
    link: '/',
    backgroundColor: '#B3EEE6',
  },
  {
    text: 'Актуальная новость2',
    urlImg: smiley,
    link: '/user',
    backgroundColor: '#FFDED0',
  },
  {
    text: 'Актуальная новость3',
    urlImg: calendar,
    link: '/user',
    backgroundColor: '#D0CBF9',
  },
  {
    text: 'Актуальная новость4',
    urlImg: smiley,
    link: '/user',
    backgroundColor: '#B3EEE6',
  },
  {
    text: 'Актуальная новость5',
    urlImg: news,
    link: '/chats',
    backgroundColor: '#D0CBF9',
  },
];

const initialState: InitialStateAdsType = {
  isAuth: false,
  swiperData: swiperData,
  adsCards: adsCardsData,
  error: null,
};

const adsSlice = createSlice({
  name: 'adsSlice',
  initialState,
  reducers: {},
});

//export const { } = adsSlice.actions;
export default adsSlice.reducer;
