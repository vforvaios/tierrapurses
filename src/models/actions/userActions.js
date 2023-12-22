import { createAction } from '@reduxjs/toolkit';

const loginUser = createAction('user/loginUser');
const logoutUser = createAction('user/logoutUser');
const registerUser = createAction('user/registerUser');

const setLoggedInUser = createAction('user/setLoggedInUser');
const addNewsletterUser = createAction('user/addNewsletterUser');
const getMyOrders = createAction('user/getMyOrders');
const setMyOrders = createAction('user/setMyOrders');
const getOrdersStatuses = createAction('user/getOrdersStatuses');
const setOrderStatuses = createAction('user/setOrderStatuses');
const setCurrentOrdersPage = createAction('user/setCurrentOrdersPage');
const setOrderId = createAction('user/setOrderId');
const getOrderDetails = createAction('user/getOrderDetails');
const setOrderDetails = createAction('user/setOrderDetails');
const resetState = createAction('user/resetState');
const navigateToLogin = createAction('user/navigateToLogin');
const sendNewUserPassword = createAction('user/sendNewUserPassword');
const changeUserPassword = createAction('user/changeUserPassword');

export {
  setLoggedInUser,
  loginUser,
  logoutUser,
  registerUser,
  addNewsletterUser,
  getMyOrders,
  setMyOrders,
  getOrdersStatuses,
  setOrderStatuses,
  setCurrentOrdersPage,
  setOrderId,
  getOrderDetails,
  setOrderDetails,
  resetState,
  navigateToLogin,
  sendNewUserPassword,
  changeUserPassword,
};
