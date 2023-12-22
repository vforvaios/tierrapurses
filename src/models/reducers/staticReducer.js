import { createReducer } from '@reduxjs/toolkit';
import {
  setStaticContent,
  setStaticPagesInMenu,
  setKeyWords,
} from 'models/actions/staticActions';

const initialState = {
  keywords: '',
  pages: [],
  staticPagesInMenu: [],
};
const staticReducer = createReducer(initialState, (builder) => {
  builder
    .addCase(setKeyWords, (state, action) => ({
      ...state,
      keywords: action.payload,
    }))
    .addCase(setStaticContent, (state, action) => ({
      ...state,
      pages: action.payload,
    }))
    .addCase(setStaticPagesInMenu, (state, action) => ({
      ...state,
      staticPagesInMenu: action.payload,
    }));
});

export default staticReducer;
