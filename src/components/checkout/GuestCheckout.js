import React from 'react';
import { Link } from 'react-router-dom';

const GuestCheckout = () => {
  return (
    <div className="guest-login-container">
      <div className="guest-title">ΕΠΙΣΚΕΠΤΗΣ</div>
      <div className="guest-content">
        <div>ή προχωρήστε στην αγορά σαν επισκέπτης</div>
        <Link className="button next" to="/checkout/step2">
          ΕΙΣΟΔΟΣ
        </Link>
      </div>
    </div>
  );
};

export default GuestCheckout;
