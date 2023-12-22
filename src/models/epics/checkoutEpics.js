import makeRequest from 'library/makeRequest';
import { toggleShowAlert } from 'models/actions/alertActions';
import { setCart, navigateBackToCart } from 'models/actions/cartActions';
import { setGeneralLoading } from 'models/actions/catalogActions';
import {
  setPaymentMethods,
  checkPaymentMethod,
  setShippingMethods,
  checkShippingMethod,
  sendOrder,
  navigateToSuccessCheckout,
  checkOrderInfo,
  setCheckoutError,
  navigateToConfirmPage,
  setOrderOk,
  setCanSeeSuccessPage,
  setUpdatedProducts,
  updateCartProducts,
  // basic
  getCountries,
  setCountries,
  setPrefectures,
  setSameAsBilling,
  getPaymentMethods,
  getShippingMethods,
  getPrefecturesPerCountryForBilling,
  getPrefecturesPerCountryForShipping,
} from 'models/actions/checkoutActions';
import { ofType, combineEpics } from 'redux-observable';
import { from } from 'rxjs';
import {
  mergeMap,
  concatMap,
  withLatestFrom,
  tap,
  ignoreElements,
} from 'rxjs/operators';

import catchErrorOperator from './operators/catchErrorOperator';

const getCountriesEpic = (action$) =>
  action$.pipe(
    ofType(getCountries.type),
    mergeMap(() =>
      from(makeRequest('countries', 'GET', '')).pipe(
        concatMap(({ countries }) => [setCountries(countries)]),
        catchErrorOperator(true),
      ),
    ),
  );

const getPrefecturesPerCountryForBillingEpic = (action$, state$) =>
  action$.pipe(
    ofType(getPrefecturesPerCountryForBilling.type),
    withLatestFrom(state$),
    mergeMap(
      ([
        { payload },
        {
          checkoutReducer: {
            shippingInfo: { country },
          },
        },
      ]) =>
        from(makeRequest(`prefectures?country_id=${payload}`, 'GET', '')).pipe(
          concatMap(({ prefectures }) => [
            setPrefectures({ prefectures, info: 'billingInfo' }),
            getPrefecturesPerCountryForShipping(country),
          ]),
          catchErrorOperator(true),
        ),
    ),
  );

const getPrefecturesPerCountryForShippingEpic = (action$, state$) =>
  action$.pipe(
    ofType(getPrefecturesPerCountryForShipping.type),
    mergeMap(({ payload }) =>
      from(makeRequest(`prefectures?country_id=${payload}`, 'GET', '')).pipe(
        concatMap(({ prefectures }) => [
          setPrefectures({ prefectures, info: 'shippingInfo' }),
          getPaymentMethods(),
          getShippingMethods(),
        ]),
        catchErrorOperator(true),
      ),
    ),
  );

const getPaymentMethodsEpic = (action$) =>
  action$.pipe(
    ofType(getPaymentMethods.type),
    mergeMap(() =>
      from(makeRequest('paymentmethods', 'GET', '')).pipe(
        concatMap((payload) => {
          const newPayload = payload?.map((paymentmethod, index) => {
            return index === 0
              ? { ...paymentmethod, checked: true }
              : { ...paymentmethod };
          });

          return [
            setPaymentMethods(newPayload),
            toggleShowAlert({ message: '', show: false, type: 'error' }),
          ];
        }),
        catchErrorOperator(true),
      ),
    ),
  );

const checkPaymentMethodEpic = (action$, state$) =>
  action$.pipe(
    ofType(checkPaymentMethod.type),
    withLatestFrom(state$),
    concatMap(
      ([
        { payload },
        {
          checkoutReducer: { paymentMethods, shippingMethods },
        },
      ]) => {
        const newPaymentMethods = paymentMethods?.map((pm) => {
          return payload === pm?.name
            ? { ...pm, checked: true }
            : { ...pm, checked: false };
        });

        // ΠΑΡΑΛΑΒΗ ΣΤΟ ΚΑΤΑΣΤΗΜΑ id=2
        const paralaviChecked = shippingMethods?.find((sm) => sm?.id === 2)
          ?.checked;

        if (
          paralaviChecked &&
          paymentMethods.find((pm) => pm.name === payload)?.id !== 2
        ) {
          const newShippingMethods = shippingMethods?.map((sm, index) => {
            return index === 0
              ? { ...sm, checked: true }
              : { ...sm, checked: false };
          });

          return [
            setPaymentMethods(newPaymentMethods),
            setShippingMethods(newShippingMethods),
          ];
        }

        if (
          !paralaviChecked &&
          paymentMethods.find((pm) => pm.name === payload)?.id === 2
        ) {
          const newShippingMethods = shippingMethods?.map((sm) => {
            return sm.id === 2
              ? { ...sm, checked: true }
              : { ...sm, checked: false };
          });

          return [
            setPaymentMethods(newPaymentMethods),
            setShippingMethods(newShippingMethods),
          ];
        }

        return [setPaymentMethods(newPaymentMethods)];
      },
    ),
  );

const getShippingMethodsEpic = (action$, state$) =>
  action$.pipe(
    ofType(setSameAsBilling.type, getShippingMethods.type),
    withLatestFrom(state$),
    mergeMap(
      ([
        ,
        {
          checkoutReducer: { sameAsBilling, shippingInfo, billingInfo },
        },
      ]) =>
        from(
          makeRequest(
            `shippingmethods?prefecture=${
              sameAsBilling ? billingInfo?.prefecture : shippingInfo?.prefecture
            }`,
            'GET',
            '',
          ),
        ).pipe(
          concatMap((payload) => {
            const newPayload = payload?.map((shippingmethod, index) => {
              return index === 0
                ? { ...shippingmethod, checked: true }
                : { ...shippingmethod };
            });

            return [
              setShippingMethods(newPayload),
              setGeneralLoading(false),
              toggleShowAlert({ message: '', show: false, type: 'error' }),
            ];
          }),
          catchErrorOperator(true),
        ),
    ),
  );

const checkShippingMethodEpic = (action$, state$) =>
  action$.pipe(
    ofType(checkShippingMethod.type),
    withLatestFrom(state$),
    concatMap(
      ([
        { payload },
        {
          checkoutReducer: { shippingMethods, paymentMethods },
        },
      ]) => {
        const newShippingMethods = shippingMethods?.map((sm) => {
          return payload === sm?.name
            ? { ...sm, checked: true }
            : { ...sm, checked: false };
        });

        // ΠΛΗΡΩΜΗ ΣΤΟ ΚΑΤΑΣΤΗΜΑ id=2
        const pliromiKatastimaChecked = paymentMethods?.find(
          (pm) => pm?.id === 2,
        )?.checked;

        if (
          pliromiKatastimaChecked &&
          shippingMethods.find((sm) => sm.name === payload)?.id !== 2
        ) {
          const newPaymentMethods = paymentMethods?.map((pm, index) => {
            return index === 0
              ? { ...pm, checked: true }
              : { ...pm, checked: false };
          });

          return [
            setPaymentMethods(newPaymentMethods),
            setShippingMethods(newShippingMethods),
          ];
        }

        if (
          !pliromiKatastimaChecked &&
          shippingMethods.find((sm) => sm.name === payload)?.id === 2
        ) {
          const newPaymentMethods = paymentMethods?.map((pm) => {
            return pm.id === 2
              ? { ...pm, checked: true }
              : { ...pm, checked: false };
          });

          return [
            setPaymentMethods(newPaymentMethods),
            setShippingMethods(newShippingMethods),
          ];
        }

        return [setShippingMethods(newShippingMethods)];
      },
    ),
  );

const sendOrderEpic = (action$, state$) =>
  action$.pipe(
    ofType(sendOrder.type),
    withLatestFrom(state$),
    mergeMap(
      ([
        ,
        {
          checkoutReducer,
          cartReducer: { cart },
          userReducer: { user },
        },
      ]) => {
        const {
          paymentMethods,
          shippingMethods,
          billingInfo,
          shippingInfo,
          receipt,
          sameAsBilling,
        } = checkoutReducer;

        const newBillingInfo = Object.keys(billingInfo)
          ?.filter((item) => item !== 'prefectures')
          ?.reduce(
            (acc, curr) => ({
              ...acc,
              [curr]: billingInfo?.[curr],
            }),
            {},
          );

        const newShippingInfo = Object.keys(shippingInfo)
          ?.filter((item) => item !== 'prefectures')
          ?.reduce(
            (acc, curr) => ({
              ...acc,
              [curr]: shippingInfo?.[curr],
            }),
            {},
          );

        return from(
          makeRequest(
            'order/sendorder',
            'POST',
            JSON.stringify({
              products: cart,
              checkoutInfo: {
                paymentMethod: paymentMethods.find((pm) => pm.checked).id,
                shippingMethod: shippingMethods.find((sm) => sm.checked).id,
                billingInfo: newBillingInfo,
                shippingInfo: newShippingInfo,
                receipt,
                sameAsBilling,
              },
              user,
            }),
          ),
        ).pipe(
          concatMap((payload) => {
            if (payload?.updatedProducts) {
              return [
                toggleShowAlert({
                  message: payload?.updatedProducts,
                  type: 'error',
                  show: true,
                }),
                setUpdatedProducts(true),
                setGeneralLoading(false),
              ];
            }

            if (payload?.error) {
              return [
                setGeneralLoading(false),
                toggleShowAlert({
                  message: `${payload?.error}`,
                  type: 'error',
                  show: true,
                }),
              ];
            }

            return [
              setGeneralLoading(false),
              setCanSeeSuccessPage(),
              navigateToSuccessCheckout(),
            ];
          }),
          catchErrorOperator(false),
        );
      },
    ),
  );

const navigateToSuccessCheckoutEpic = (action$) =>
  action$.pipe(
    ofType(navigateToSuccessCheckout.type),
    tap(() => (window.location = './success')),
    ignoreElements(),
  );

const checkOrderInfoEpic = (action$, state$) =>
  action$.pipe(
    ofType(checkOrderInfo.type),
    withLatestFrom(state$),
    concatMap(
      ([
        ,
        {
          checkoutReducer: { billingInfo, shippingInfo, sameAsBilling },
        },
      ]) => {
        const requiredFields = [
          'name',
          'lastName',
          'mobile',
          'address',
          'email',
          'postCode',
          'prefecture',
        ];

        const billingErrors = requiredFields
          .reduce(
            (acc, curr) => [
              ...acc,
              billingInfo[curr] === '' || !billingInfo[curr] ? curr : null,
            ],
            [],
          )
          .filter((x) => x !== null);

        const shippingErrors = sameAsBilling
          ? []
          : requiredFields
              .reduce(
                (acc, curr) => [
                  ...acc,
                  shippingInfo[curr] === '' || !shippingInfo[curr]
                    ? curr
                    : null,
                ],
                [],
              )
              .filter((x) => x !== null);

        if (billingErrors.length === 0 && shippingErrors.length === 0) {
          return [
            setCheckoutError({ billingErrors, shippingErrors }),
            setOrderOk(),
            navigateToConfirmPage(),
          ];
        }

        return [setCheckoutError({ billingErrors, shippingErrors })];
      },
    ),
  );

const navigateToConfirmPageEpic = (action$) =>
  action$.pipe(
    ofType(navigateToConfirmPage.type),
    tap(() => (window.location = './confirm')),
    ignoreElements(),
  );

const updateCartProductsEpic = (action$, state$) =>
  action$.pipe(
    ofType(updateCartProducts.type),
    withLatestFrom(state$),
    mergeMap(
      ([
        ,
        {
          cartReducer: { cart },
        },
      ]) => {
        const productIds = cart?.map((prod) => prod?.productId).join(',');

        return from(
          makeRequest(
            `products/updated/prods?products=${productIds}`,
            'GET',
            '',
          ),
        ).pipe(
          concatMap(({ products }) => {
            const newCart = products?.map((product) => ({
              ...product,
              initialPrice: product?.initialPrice,
              price: product?.price,
              total:
                product?.stock === 0
                  ? 0
                  : product?.stock <
                    cart?.find((pr) => pr?.productId === product?.productId)
                      ?.total
                  ? cart?.find((pr) => pr?.productId === product?.productId)
                      ?.total
                  : 1,
            }));

            return [
              setCart(newCart),
              toggleShowAlert({
                message: `Ενημερώθηκαν οι τιμές και τα stock των items.`,
                type: 'success',
                show: true,
              }),
              newCart?.filter((pr) => pr?.total === 0)?.length === 0 &&
                setUpdatedProducts(false),
            ];
          }),
          catchErrorOperator(false),
        );
      },
    ),
  );

const navigateBackToCartEpic = (action$) =>
  action$.pipe(
    ofType(navigateBackToCart.type),
    tap(() => (window.location = '../cart')),
    ignoreElements(),
  );

export {
  getPaymentMethodsEpic,
  checkPaymentMethodEpic,
  getShippingMethodsEpic,
  checkShippingMethodEpic,
  sendOrderEpic,
  navigateToSuccessCheckoutEpic,
  checkOrderInfoEpic,
  navigateToConfirmPageEpic,
  updateCartProductsEpic,
  navigateBackToCartEpic,
  getCountriesEpic,
  getPrefecturesPerCountryForBillingEpic,
  getPrefecturesPerCountryForShippingEpic,
};

const epics = combineEpics(
  getPaymentMethodsEpic,
  checkPaymentMethodEpic,
  getShippingMethodsEpic,
  checkShippingMethodEpic,
  sendOrderEpic,
  navigateToSuccessCheckoutEpic,
  checkOrderInfoEpic,
  navigateToConfirmPageEpic,
  updateCartProductsEpic,
  navigateBackToCartEpic,
  getCountriesEpic,
  getPrefecturesPerCountryForBillingEpic,
  getPrefecturesPerCountryForShippingEpic,
);

export default epics;
