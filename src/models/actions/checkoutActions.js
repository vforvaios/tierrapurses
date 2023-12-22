import { createAction } from '@reduxjs/toolkit';

const getPaymentMethods = createAction('checkout/getPaymentMethods');
const setPaymentMethods = createAction('checkout/setPaymentMethods');
const checkPaymentMethod = createAction('checkout/checkPaymentMethod');

const getShippingMethods = createAction('checkout/getShippingMethods');
const setShippingMethods = createAction('checkout/setShippingMethods');
const checkShippingMethod = createAction('checkout/checkShippingMethod');

const setBillingInfo = createAction('checkout/setBillingInfo');
const setShippingInfo = createAction('checkout/setShippingInfo');
const setReceipt = createAction('checkout/setReceipt');
const setSameAsBilling = createAction('checkout/setSameAsBilling');

const sendOrder = createAction('checkout/sendOrder');
const navigateToSuccessCheckout = createAction(
  'checkout/navigateToSuccessCheckout',
);
const clearOrder = createAction('checkout/clearOrder');
const checkOrderInfo = createAction('checkout/checkOrderInfo');
const setCheckoutError = createAction('checkout/setCheckoutError');
const navigateToConfirmPage = createAction('checkout/navigateToConfirmPage');
const setOrderOk = createAction('checkout/setOrderOk');
const setCanSeeSuccessPage = createAction('checkout/setCanSeeSuccessPage');
const setUpdatedProducts = createAction('checkout/setUpdatedProducts');
const updateCartProducts = createAction('checkout/updateCartProducts');
const getCountries = createAction('checkout/getCountries');
const setCountries = createAction('checkout/setCountries');
const getPrefecturesPerCountryForBilling = createAction(
  'checkout/getPrefecturesPerCountryForBilling',
);
const getPrefecturesPerCountryForShipping = createAction(
  'checkout/getPrefecturesPerCountryForShipping',
);
const setPrefectures = createAction('checkout/setPrefectures');
const changedCountry = createAction('checkout/changedCountry');
const changedPrefecture = createAction('checkout/changedPrefecture');

export {
  getPaymentMethods,
  setPaymentMethods,
  checkPaymentMethod,
  getShippingMethods,
  setShippingMethods,
  checkShippingMethod,
  setBillingInfo,
  setShippingInfo,
  setReceipt,
  setSameAsBilling,
  sendOrder,
  navigateToSuccessCheckout,
  clearOrder,
  checkOrderInfo,
  setCheckoutError,
  navigateToConfirmPage,
  setOrderOk,
  setCanSeeSuccessPage,
  setUpdatedProducts,
  updateCartProducts,
  getCountries,
  setCountries,
  getPrefecturesPerCountryForBilling,
  getPrefecturesPerCountryForShipping,
  setPrefectures,
  changedPrefecture,
  changedCountry,
};
