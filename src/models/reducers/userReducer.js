import { createReducer } from '@reduxjs/toolkit';
import {
  setLoggedInUser,
  setMyOrders,
  setOrderStatuses,
  setOrderId,
  setOrderDetails,
  setCurrentOrdersPage,
  logoutUser,
} from 'models/actions/userActions';

const initialState = {
  user: {},
  myOrders: {
    pagination: {
      total: 0,
      currentPage: 1,
      perPage: process.env.REACT_APP_PER_PAGE,
    },
    results: [],
  },
  statuses: [],
  orderId: '',
  orderDetails: {},
};

const userReducer = createReducer(initialState, (builder) => {
  builder
    .addCase(setLoggedInUser, (state, action) => ({
      ...state,
      user: action.payload,
    }))
    .addCase(setOrderDetails, (state, action) => ({
      ...state,
      orderDetails: action.payload,
    }))
    .addCase(logoutUser, (state, action) => ({
      ...state,
      orderDetails: {},
      statuses: [],
      orderId: '',
      myOrders: {
        pagination: {
          total: 0,
          currentPage: 1,
          perPage: process.env.REACT_APP_PER_PAGE,
        },
        results: [],
      },
    }))
    .addCase(setMyOrders, (state, action) => ({
      ...state,
      myOrders: {
        ...state?.myOrders,
        pagination: {
          ...state?.myOrders.pagination,
          total: action.payload.total,
        },
        results: action.payload.results,
      },
    }))
    .addCase(setCurrentOrdersPage, (state, action) => ({
      ...state,
      myOrders: {
        ...state?.myOrders,
        pagination: {
          ...state?.myOrders.pagination,
          currentPage: action.payload,
          total: action.payload.total,
        },
      },
    }))
    .addCase(setOrderStatuses, (state, action) => ({
      ...state,
      statuses: action.payload,
    }))
    .addCase(setOrderId, (state, action) => ({
      ...state,
      orderId: action.payload,
    }));
});

export default userReducer;
