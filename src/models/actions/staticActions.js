import { createAction } from '@reduxjs/toolkit';

const getStaticContent = createAction('staticContentPages/getStaticContent');
const setStaticContent = createAction('staticContentPages/setStaticContent');
const setStaticPagesInMenu = createAction(
  'staticContentPages/setStaticPagesInMenu',
);
const getKeyWords = createAction('staticContentPages/getKeyWords');
const setKeyWords = createAction('staticContentPages/setKeyWords');

export {
  getStaticContent,
  setStaticContent,
  setStaticPagesInMenu,
  getKeyWords,
  setKeyWords,
};
