import SEO from 'components/seo/SEO';
import { checkOrderInfo } from 'models/actions/checkoutActions';
import { cart } from 'models/selectors/cartSelectors';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

import Billing from './Billing';
import CheckoutStepper from './CheckoutStepper';
import PaymentMethods from './PaymentMethods';
import ShippingMethods from './ShippingMethods';

const CheckoutEdit = () => {
  const navigate = useNavigate();
  const cartItems = useSelector(cart);
  const dispatch = useDispatch();

  useEffect(() => {
    if (cartItems?.length === 0) {
      navigate('/');
    }
  });

  return (
    <div className="content checkout step3">
      <SEO
        title="Shoppy checkout step 3"
        description="Shoppy checkout step 3 page"
        name="Shoppy"
        type="article"
      />
      <div className="row">
        <div className="wrapper">
          <div className="text-center">
            <h1 className="page-title">ΔΙΕΥΘΥΝΣΗ ΚΑΙ ΠΛΗΡΩΜΗ</h1>
          </div>
        </div>
      </div>
      <div className="row">
        <div className="wrapper">
          <CheckoutStepper step="2" />
        </div>
      </div>
      <div className="row">
        <div className="wrapper">
          <div className="actions separate">
            <button className="button back">
              <Link to="/catalog">ΠΙΣΩ ΣΤΟΝ ΚΑΤΑΛΟΓΟ...</Link>
            </button>
            <button
              className="button next"
              onClick={() => dispatch(checkOrderInfo())}>
              ΕΠΙΒΕΒΑΙΩΣΗ ΠΑΡΑΓΓΕΛΙΑΣ
            </button>
          </div>
        </div>
      </div>
      <div className="row">
        <div className="wrapper">
          <div className="billing-shipping-container">
            <Billing />
          </div>
        </div>
      </div>
      <div className="row">
        <div className="wrapper">
          <div className="payment-shipping-container">
            <PaymentMethods />
            <ShippingMethods />
          </div>
        </div>
      </div>
      <div className="row">
        <div className="wrapper">
          <div className="actions separate">
            <button className="button back">
              <Link to="/catalog">ΠΙΣΩ ΣΤΟΝ ΚΑΤΑΛΟΓΟ...</Link>
            </button>
            <button
              className="button next"
              onClick={() => dispatch(checkOrderInfo())}>
              ΕΠΙΒΕΒΑΙΩΣΗ ΠΑΡΑΓΓΕΛΙΑΣ
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CheckoutEdit;
