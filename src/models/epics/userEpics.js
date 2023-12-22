import makeRequest from 'library/makeRequest';
import { toggleShowAlert } from 'models/actions/alertActions';
import { setGeneralLoading } from 'models/actions/catalogActions';
import {
  loginUser,
  setLoggedInUser,
  logoutUser,
  registerUser,
  addNewsletterUser,
  getMyOrders,
  setMyOrders,
  getOrdersStatuses,
  setOrderStatuses,
  setCurrentOrdersPage,
  getOrderDetails,
  setOrderDetails,
  navigateToLogin,
  sendNewUserPassword,
  changeUserPassword,
} from 'models/actions/userActions';
import { token, currentOrderPage } from 'models/selectors/userSelector';
import { ofType, combineEpics } from 'redux-observable';
import { from } from 'rxjs';
import { mergeMap, concatMap, map, tap, ignoreElements } from 'rxjs/operators';

import catchErrorOperator from './operators/catchErrorOperator';

const getOrdersStatusesEpic = (action$, state$) =>
  action$.pipe(
    ofType(getOrdersStatuses.type),
    mergeMap(() =>
      from(makeRequest('statuses/admin', 'GET', '', token(state$.value))).pipe(
        concatMap((payload) => {
          if (payload?.error) {
            return [
              toggleShowAlert({
                message: `${payload?.error}`,
                show: true,
                type: 'error',
              }),
              setGeneralLoading(false),
            ];
          }

          return [setOrderStatuses(payload?.data), getMyOrders()];
        }),
        catchErrorOperator(true),
      ),
    ),
  );

const loginUserEpic = (action$) =>
  action$.pipe(
    ofType(loginUser.type),
    mergeMap(({ payload }) =>
      from(makeRequest('login', 'POST', JSON.stringify(payload))).pipe(
        concatMap((payload) => {
          if (payload?.error) {
            return [
              setGeneralLoading(false),
              toggleShowAlert({
                message: `${payload.error}`,
                show: true,
                type: 'error',
              }),
            ];
          }

          return [setGeneralLoading(false), setLoggedInUser(payload)];
        }),
        catchErrorOperator(true),
      ),
    ),
  );

const logoutUserEpic = (action$) =>
  action$.pipe(
    ofType(logoutUser.type),
    map(() => setLoggedInUser({})),
  );

const addNewsletterUserEpic = (action$) =>
  action$.pipe(
    ofType(addNewsletterUser.type),
    mergeMap(({ payload }) =>
      from(
        makeRequest(
          'newsletter/add',
          'POST',
          JSON.stringify({ email: payload }),
        ),
      ).pipe(
        concatMap((payload) => {
          if (payload?.error) {
            return [
              setGeneralLoading(false),
              toggleShowAlert({
                message: `${payload.error}`,
                type: 'error',
                show: true,
              }),
            ];
          }

          return [
            setGeneralLoading(false),
            toggleShowAlert({
              message: `${payload.message}`,
              type: 'success',
              show: true,
            }),
          ];
        }),
        catchErrorOperator(true),
      ),
    ),
  );

const registerUserEpic = (action$) =>
  action$.pipe(
    ofType(registerUser.type),
    mergeMap(({ payload }) =>
      from(makeRequest('register', 'POST', JSON.stringify(payload))).pipe(
        concatMap((payload) => {
          if (payload?.error) {
            return [
              setGeneralLoading(false),
              toggleShowAlert({
                message: `${payload.error}`,
                type: 'error',
                show: true,
              }),
            ];
          }

          return [
            setGeneralLoading(false),
            toggleShowAlert({
              message: `${payload.message}`,
              type: 'success',
              show: true,
            }),
            navigateToLogin(),
          ];
        }),
        catchErrorOperator(true),
      ),
    ),
  );

const navigateToLoginEpic = (action$) =>
  action$.pipe(
    ofType(navigateToLogin.type),
    tap(() => (window.location = './login')),
    ignoreElements(),
  );

const getMyOrdersEpic = (action$, state$) =>
  action$.pipe(
    ofType(getMyOrders.type, setCurrentOrdersPage.type),
    mergeMap(() =>
      from(
        makeRequest(
          `order/admin/userorders?page=${currentOrderPage(state$.value)}`,
          'GET',
          '',
          token(state$.value),
        ),
      ).pipe(
        concatMap((payload) => {
          if (payload?.error) {
            return [
              toggleShowAlert({
                message: `${payload?.error}`,
                show: true,
                type: 'error',
              }),
              setGeneralLoading(false),
            ];
          }

          return [
            setMyOrders({ results: payload?.orders, total: payload?.total }),
            setGeneralLoading(false),
          ];
        }),
        catchErrorOperator(true),
      ),
    ),
  );

const getOrderDetailsEpic = (action$, state$) =>
  action$.pipe(
    ofType(getOrderDetails.type),
    mergeMap(({ payload }) =>
      from(
        makeRequest(
          `order/admin/order/${payload}`,
          'GET',
          '',
          token(state$.value),
        ),
      ).pipe(
        concatMap((data) => {
          if (data?.error) {
            return [
              toggleShowAlert({
                message: `${data?.error}`,
                show: true,
                type: 'error',
              }),
              setGeneralLoading(false),
            ];
          }

          const payload = {
            pastStatuses: data?.pastStatuses,
            order: data?.order,
            products: data?.products?.map((product) => ({
              ...product,
              total: Number(product.items),
              totalPrice: Number(product?.items) * product?.price,
            })),
          };

          return [setOrderDetails(payload), setGeneralLoading(false)];
        }),
        catchErrorOperator(true),
      ),
    ),
  );

const sendNewUserPasswordEpic = (action$) =>
  action$.pipe(
    ofType(sendNewUserPassword.type),
    mergeMap(({ payload }) =>
      from(makeRequest('login/forgot', 'POST', JSON.stringify(payload))).pipe(
        concatMap((payload) => {
          if (payload?.error?.details?.length) {
            return [
              setGeneralLoading(false),
              toggleShowAlert({
                message: `${payload.error}`,
                type: 'error',
                show: true,
              }),
            ];
          }

          if (payload?.error) {
            return [
              setGeneralLoading(false),
              toggleShowAlert({
                message: `${payload.error}`,
                type: 'error',
                show: true,
              }),
            ];
          }

          return [
            toggleShowAlert({
              message: `${payload?.message}`,
              type: 'success',
              show: true,
            }),
            setGeneralLoading(false),
          ];
        }),
        catchErrorOperator(true),
      ),
    ),
  );

const changeUserPasswordEpic = (action$, state$) =>
  action$.pipe(
    ofType(changeUserPassword.type),
    mergeMap(({ payload }) =>
      from(
        makeRequest(
          'login/changepassword',
          'POST',
          JSON.stringify({ password: payload?.password }),
          token(state$.value),
        ),
      ).pipe(
        concatMap((payload) => {
          if (payload?.error?.details?.length) {
            return [
              setGeneralLoading(false),
              toggleShowAlert({
                message: `${payload.error}`,
                type: 'error',
                show: true,
              }),
            ];
          }

          if (payload?.error) {
            return [
              setGeneralLoading(false),
              toggleShowAlert({
                message: `${payload.error}`,
                type: 'error',
                show: true,
              }),
            ];
          }

          return [
            setGeneralLoading(false),
            toggleShowAlert({
              message: `${payload.message}`,
              type: 'success',
              show: true,
            }),
            navigateToLogin(),
          ];
        }),
        catchErrorOperator(true),
      ),
    ),
  );

export {
  loginUserEpic,
  logoutUserEpic,
  registerUserEpic,
  addNewsletterUserEpic,
  getMyOrdersEpic,
  getOrdersStatusesEpic,
  getOrderDetailsEpic,
  navigateToLoginEpic,
  sendNewUserPasswordEpic,
  changeUserPasswordEpic,
};

const epics = combineEpics(
  loginUserEpic,
  logoutUserEpic,
  registerUserEpic,
  addNewsletterUserEpic,
  getMyOrdersEpic,
  getOrdersStatusesEpic,
  getOrderDetailsEpic,
  navigateToLoginEpic,
  sendNewUserPasswordEpic,
  changeUserPasswordEpic,
);

export default epics;
