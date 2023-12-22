import { createReducer } from '@reduxjs/toolkit';
import {
  setPaymentMethods,
  setShippingMethods,
  setBillingInfo,
  setShippingInfo,
  setReceipt,
  setSameAsBilling,
  clearOrder,
  setCheckoutError,
  setOrderOk,
  setCanSeeSuccessPage,
  setUpdatedProducts,
  setCountries,
  setPrefectures,
  changedPrefecture,
} from 'models/actions/checkoutActions';

const initialState = {
  updatedProducts: false,
  billingErrors: [],
  shippingErrors: [],
  paymentMethods: [],
  shippingMethods: [],
  countries: [],
  prefectureIsChanged: false,
  billingInfo: {
    name: '',
    lastName: '',
    email: '',
    phone: '',
    mobile: '',
    address: '',
    postCode: '',
    city: '',
    region: '',
    country: 81,
    prefecture: 1,
    prefectures: [],
  },
  shippingInfo: {
    name: '',
    lastName: '',
    email: '',
    phone: '',
    mobile: '',
    address: '',
    postCode: '',
    city: '',
    region: '',
    country: 81,
    prefecture: 1,
    prefectures: [],
  },
  receipt: 'receipt',
  sameAsBilling: true,
  orderOK: false,
  canSeeSuccessPage: false,
};

const checkoutReducer = createReducer(initialState, (builder) => {
  builder
    .addCase(changedPrefecture, (state, action) => ({
      ...state,
      prefectureIsChanged: action.payload,
    }))
    .addCase(setPrefectures, (state, action) => ({
      ...state,
      [action.payload?.info]: {
        ...state?.[action?.payload?.info],
        prefectures: action?.payload?.prefectures,
        prefecture: action?.payload?.prefectures?.[0]?.id,
      },
    }))
    .addCase(setCountries, (state, action) => ({
      ...state,
      countries: action.payload,
    }))
    .addCase(setUpdatedProducts, (state, action) => ({
      ...state,
      updatedProducts: action.payload,
    }))
    .addCase(setPaymentMethods, (state, action) => ({
      ...state,
      paymentMethods: action.payload,
    }))
    .addCase(setShippingMethods, (state, action) => ({
      ...state,
      shippingMethods: action.payload,
    }))
    .addCase(setReceipt, (state, action) => ({
      ...state,
      receipt: action.payload,
    }))
    .addCase(setSameAsBilling, (state, action) => ({
      ...state,
      sameAsBilling: action.payload,
    }))
    .addCase(setBillingInfo, (state, action) => ({
      ...state,
      billingInfo: {
        ...state?.billingInfo,
        [action.payload.key]: action.payload.name,
      },
      prefectureIsChanged: false,
    }))
    .addCase(setShippingInfo, (state, action) => ({
      ...state,
      shippingInfo: {
        ...state?.shippingInfo,
        [action.payload.key]: action.payload.name,
      },
      prefectureIsChanged: false,
    }))
    .addCase(clearOrder, (state, action) => ({
      ...initialState,
    }))
    .addCase(setCheckoutError, (state, action) => ({
      ...state,
      billingErrors: action.payload.billingErrors,
      shippingErrors: action.payload.shippingErrors,
    }))
    .addCase(setOrderOk, (state, action) => ({
      ...state,
      orderOK: true,
    }))
    .addCase(setCanSeeSuccessPage, (state, action) => ({
      ...state,
      canSeeSuccessPage: true,
    }));
});

export default checkoutReducer;
