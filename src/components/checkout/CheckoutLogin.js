import SEO from 'components/seo/SEO';
import Login from 'components/user/Login';
import React from 'react';

import CheckoutStepper from './CheckoutStepper';
import GuestCheckout from './GuestCheckout';

const CheckoutLogin = () => {
  return (
    <div className="content checkout step1">
      <SEO
        title="Shoppy checkout step 1"
        description="Shoppy checkout step 1 page"
        name="Shoppy"
        type="article"
      />
      <div className="row">
        <div className="wrapper">
          <div className="text-center">
            <h1 className="page-title">ΣΥΝΔΕΣΗ</h1>
          </div>
        </div>
      </div>
      <div className="row">
        <div className="wrapper">
          <CheckoutStepper step="1" />
        </div>
      </div>
      <div className="row">
        <div className="wrapper">
          <Login />
          <div className="login-container">
            <GuestCheckout />
          </div>
        </div>
      </div>
    </div>
  );
};

export default CheckoutLogin;
