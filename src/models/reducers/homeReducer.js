/* eslint-disable max-len */
import { createReducer } from '@reduxjs/toolkit';
import { setHomePageData, setLogo } from 'models/actions/homeActions';

const initialState = {
  logo: {},
  homeSlider: [],
  offers: {
    results: [],
  },
  sections: {
    results: [],
  },
  banners: {
    results: [],
  },
};
const homeReducer = createReducer(initialState, (builder) => {
  builder
    .addCase(setLogo, (state, action) => ({
      ...state,
      logo: action.payload,
    }))
    .addCase(setHomePageData, (state, action) => ({
      ...state,
      offers: {
        ...state.offers,
        results: action.payload.tabsOffers,
      },
      sections: {
        ...state.offers,
        results: action.payload?.sections,
      },
      banners: {
        ...state.offers,
        results: action.payload?.banners,
      },
    }));
});

export default homeReducer;
