import makeRequest from 'library/makeRequest';
import { toggleShowAlert } from 'models/actions/alertActions';
import {
  getCart,
  setCart,
  addToCart,
  removeItemFromCart,
  updateCartItemTotal,
  navigateBackToCart,
} from 'models/actions/cartActions';
import { setUpdatedProducts } from 'models/actions/checkoutActions';
import { ofType, combineEpics } from 'redux-observable';
import { from } from 'rxjs';
import { mergeMap, concatMap, map, withLatestFrom } from 'rxjs/operators';

import catchErrorOperator from './operators/catchErrorOperator';

// TODO - NOT USED AT THE MOMENT
const getCartEpic = (action$) =>
  action$.pipe(
    ofType(getCart.type),
    mergeMap(() =>
      from(makeRequest('cart', 'GET', '')).pipe(
        concatMap((payload) => [
          setCart(payload),
          toggleShowAlert({ message: '', show: false, type: 'error' }),
        ]),
        catchErrorOperator(false),
      ),
    ),
  );

const addToCartEpic = (action$, state$) =>
  action$.pipe(
    ofType(addToCart.type),
    withLatestFrom(state$),
    concatMap(
      ([
        { payload },
        {
          cartReducer: { cart },
        },
      ]) => {
        const {
          productDescription,
          productId,
          price,
          productTitle,
          initialPrice,
          imgHref,
        } = payload;

        const productAlreadyExistsInCart =
          cart?.findIndex((item) => item?.productId === productId) >= 0;

        let newCart = [];

        if (!productAlreadyExistsInCart) {
          newCart = [
            ...cart,
            {
              productTitle,
              productId,
              productDescription,
              total: 1,
              imgHref,
              price,
              initialPrice,
              totalPrice: price,
            },
          ];
        } else {
          newCart = cart?.map((cartItem) => {
            return cartItem.productId !== productId
              ? { ...cartItem }
              : {
                  ...cartItem,
                  price,
                  imgHref,
                  initialPrice,
                  total: Number(Number(cartItem.total) + 1),
                  totalPrice: Number(
                    (Number(cartItem?.total) + 1) * Number(cartItem?.price),
                  ),
                };
          });
        }

        return [
          setCart(newCart),
          toggleShowAlert({
            message: `Το προϊόν προστέθηκε στο καλάθι.`,
            type: 'success',
            show: true,
          }),
        ];
      },
    ),
  );

const removeItemFromCartEpic = (action$, state$) =>
  action$.pipe(
    ofType(removeItemFromCart.type),
    withLatestFrom(state$),
    concatMap(
      ([
        { payload },
        {
          cartReducer: { cart },
        },
      ]) => {
        const productId = payload?.id;
        const isCheckout = payload?.checkout;

        const newCart = cart?.filter((item) => item?.productId !== productId);

        if (isCheckout) {
          if (newCart.length === 0) {
            return [
              setCart(newCart),
              setUpdatedProducts(false),
              navigateBackToCart(),
            ];
          }

          if (
            newCart.length > 0 &&
            newCart.filter((pr) => pr.total === 0)?.length === 0
          ) {
            return [setCart(newCart), setUpdatedProducts(false)];
          }
        }

        return [setCart(newCart)];
      },
    ),
  );

const updateCartItemTotalEpic = (action$, state$) =>
  action$.pipe(
    ofType(updateCartItemTotal.type),
    withLatestFrom(state$),
    map(
      ([
        { payload },
        {
          cartReducer: { cart },
        },
      ]) => {
        const { total, productId } = payload;

        const newCart = cart?.map((item) => {
          return item?.productId !== productId
            ? { ...item }
            : { ...item, total: Number(total), totalPrice: total * item.price };
        });

        return setCart(newCart);
      },
    ),
  );

export {
  getCartEpic,
  addToCartEpic,
  removeItemFromCartEpic,
  updateCartItemTotalEpic,
};

const epics = combineEpics(
  getCartEpic,
  addToCartEpic,
  removeItemFromCartEpic,
  updateCartItemTotalEpic,
);

export default epics;
