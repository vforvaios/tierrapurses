/* eslint-disable react-hooks/exhaustive-deps */
import SEO from 'components/seo/SEO';
import { clearOrder } from 'models/actions/checkoutActions';
import { cart } from 'models/selectors/cartSelectors';
import { canSeeSuccessPage } from 'models/selectors/checkoutSelectors';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

const CheckoutSuccess = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const cartItems = useSelector(cart);
  const myCanSeeSuccessPage = useSelector(canSeeSuccessPage);

  const handleEventListener = () => {
    dispatch(clearOrder());
  };

  useEffect(() => {
    window.addEventListener('load', handleEventListener);
    if (cartItems?.length === 0 || !myCanSeeSuccessPage) {
      navigate('/');
    }

    return () => {
      window.removeEventListener('load', handleEventListener);
    };
  }, []);

  return (
    <div className="content checkout step4">
      <SEO
        title="Shoppy checkout step 4"
        description="Shoppy checkout step 4 page"
        name="Shoppy"
        type="article"
      />
      <div className="row">
        <div className="wrapper">
          <div className="checkout-success">
            <h2>ΣΥΓΧΑΡΗΤΗΡΙΑ!</h2>
            <div className="success-message">
              Η ΠΑΡΑΓΓΕΛΙΑ ΣΑΣ ΟΛΟΚΛΗΡΩΘΗΚΕ. ΠΟΛΥ ΣΥΝΤΟΜΑ ΘΑ ΠΑΡΑΛΑΒΕΤΕ ΕΝΑ
              EMAIL ΜΕ ΤΙΣ ΠΛΗΡΟΦΟΡΙΕΣ ΤΗΣ ΠΑΡΑΓΓΕΛΙΑΣ ΣΑΣ. ΕΥΧΑΡΙΣΤΟΥΜΕ ΠΟΛΥ
              ΓΙΑ ΤΗΝ ΠΡΟΤΙΜΗΣΗ ΣΑΣ.
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CheckoutSuccess;
