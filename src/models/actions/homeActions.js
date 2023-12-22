import { createAction } from '@reduxjs/toolkit';

const getHomePageData = createAction('home/getHomePageData');
const setHomePageData = createAction('home/setHomePageData');
const getLogo = createAction('home/getLogo');
const setLogo = createAction('home/setLogo');

export { getHomePageData, setHomePageData, getLogo, setLogo };
