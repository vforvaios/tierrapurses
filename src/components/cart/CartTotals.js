import formatMoney from 'library/formatMoney';
import getCartTotals from 'library/getCartTotals';
import getCartTotalsDiscount from 'library/getCartTotalsDiscount';
import {
  shippingMethods,
  paymentMethods,
} from 'models/selectors/checkoutSelectors';
import React from 'react';
import { useSelector } from 'react-redux';

const CartTotals = ({ cart, order }) => {
  const mySmCost = useSelector(shippingMethods);
  const myPmCost = useSelector(paymentMethods);
  let smCost;
  let pmCost;

  if (!order || Object.keys(order)?.length === 0) {
    smCost = mySmCost?.find((shippingmethod) => shippingmethod.checked)?.cost
      ? parseFloat(
          mySmCost?.find((shippingmethod) => shippingmethod.checked)?.cost,
        )
      : Number(0);
    pmCost = myPmCost?.find((paymentmethod) => paymentmethod.checked)?.cost
      ? parseFloat(
          myPmCost?.find((paymentmethod) => paymentmethod.checked)?.cost,
        )
      : Number(0);
  }

  if (!smCost) {
    smCost = parseFloat(order?.shippingMethodCost);
  }

  if (!pmCost) {
    pmCost = parseFloat(order?.paymentMethodCost);
  }

  return (
    <div className="cart-totals-container">
      <div className="cart-totals-row cart-totals-row-title">ΣΥΝΟΛΟ</div>
      <div className="cart-totals-row">
        <span className="cart-totals-name">Συνολική έκπτωση:</span>
        <span className="cart-totals-value">
          {formatMoney.format(getCartTotalsDiscount(cart))}
        </span>
      </div>
      {Number(smCost) > Number(0) && (
        <div className="cart-totals-row">
          <span className="cart-totals-name">Μεταφορικά:</span>
          <span className="cart-totals-value">
            {formatMoney.format(smCost)}
          </span>
        </div>
      )}
      {Number(pmCost) > Number(0) && (
        <div className="cart-totals-row">
          <span className="cart-totals-name">Έξοδα πληρωμής:</span>
          <span className="cart-totals-value">
            {formatMoney.format(pmCost)}
          </span>
        </div>
      )}
      <div className="cart-totals-row bold">
        <span className="cart-totals-name">Σύνολο πληρωμής:</span>
        <span className="cart-totals-value">
          {smCost || pmCost
            ? formatMoney.format(
                parseFloat(smCost) +
                  parseFloat(pmCost) +
                  parseFloat(getCartTotals(cart)),
              )
            : formatMoney.format(getCartTotals(cart))}
        </span>
      </div>
    </div>
  );
};

export default CartTotals;
